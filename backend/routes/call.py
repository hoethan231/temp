import os
from openai import OpenAI
from fastapi import APIRouter, HTTPException
from typing import List
from bson import ObjectId
from dotenv import load_dotenv
from models import RawEvent, ParsedCall, CallTranscriptOut
from db import call_tb

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

call_router = APIRouter(prefix="/calls", tags=["calls"])

@call_router.post("/parse", response_model=CallTranscriptOut)
async def parse_and_create_call(events: List[RawEvent]):
    raw_json = [e.dict() for e in events]
    prompt = f"""
    You are a JSON-parsing assistant.  Given this array of call events:
    {raw_json}

    Produce a JSON object with these exact fields:
    - caller_id: the caller’s phone or chat ID, hash a random number if none
    - call_timestamp: ISO8601 timestamp of when the call started
    - raw_transcript: a single string concatenating every user/assistant message in order
    - language: two-letter language code (default "en")
    - tags: a list of zero or more keywords (e.g. "emergency", "fire", "medical")

    Return **only** the JSON object — no extra text.
    """

    try:
        llm_resp = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {"role": "system", "content": "You parse technical logs into structured JSON."},
                {"role": "user",   "content": prompt}
            ],
            temperature=0.0,
        )
    except Exception as e:
        raise HTTPException(502, f"LLM error: {e}")

    text = llm_resp.choices[0].message.content
    try:
        parsed = ParsedCall.parse_raw(text)
    except Exception as e:
        raise HTTPException(500, f"Failed to parse LLM output: {e}\nGot:\n{text}")

    try:
        embed_resp = client.embeddings.create(
            model="text-embedding-ada-002",
            input=parsed.raw_transcript
        )
        embedding = embed_resp.data[0].embedding
    except Exception as e:
        raise HTTPException(504, f"Embedding error: {e}")

    record = parsed.dict()
    record["embedding"] = embedding
    result = await call_tb.insert_one(record)

    return CallTranscriptOut(id=str(result.inserted_id), **record)


@call_router.get("/", response_model=List[CallTranscriptOut])
async def list_call_transcripts():
    cursor = call_tb.find()
    docs = await cursor.to_list(length=100)
    return [
        CallTranscriptOut(id=str(d["_id"]), **{k: d[k] for k in d if k != "_id"})
        for d in docs
    ]

@call_router.get("/{id}", response_model=CallTranscriptOut)
async def get_call_transcript(id: str):
    d = await call_tb.find_one({"_id": ObjectId(id)})
    if not d:
        raise HTTPException(status_code=404, detail="Transcript not found")
    return CallTranscriptOut(id=str(d["_id"]), **{k: d[k] for k in d if k != "_id"})

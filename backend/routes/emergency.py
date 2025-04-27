from fastapi import APIRouter, HTTPException, Request
from models import EmergencyCreate, EmergencyOut
from db import emergency_tb

# from hume.empathic_voice.types import (
#     WebhookEvent,
#     WebhookEventChatStarted,
#     WebhookEventChatEnded
# )
# from hume_utilities import validate_headers, get_chat_transcript
from bson import ObjectId

emergency_router = APIRouter(prefix="/emergencies", tags=["emergencies"])

@emergency_router.post("/new", response_model=EmergencyOut)
async def create_emergency(emergency: EmergencyCreate):
    record = emergency.dict()
    result = await emergency_tb.insert_one(record)
    return {**record, "id": str(result.inserted_id)}

@emergency_router.get("/list", response_model=list[EmergencyOut])
async def list_emergencies():
    cursor = emergency_tb.find()
    emergencies = await cursor.to_list(length=100)
    return [{**e, "id": str(e["_id"])} for e in emergencies]

@emergency_router.get("/{id}", response_model=EmergencyOut)
async def get_emergency(id: str):
    emergency = await emergency_tb.find_one({"_id": ObjectId(id)})
    if not emergency:
        raise HTTPException(status_code=404, detail="Emergency not found")
    return {**emergency, "id": str(emergency["_id"])}

@emergency_router.delete("/{id}/delete")
async def delete_emergency(id: str):
    result = await emergency_tb.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Emergency not found")
    return {"status": "deleted"}

# # For hume
# @emergency_router.post("/hume-webhook")
# async def hume_webhook_handler(request: Request, event: WebhookEvent):
#     # Get raw body
#     raw_payload = await request.body()
#     payload_str = raw_payload.decode("utf-8")

#     try:
#         validate_headers(payload_str, request.headers)
#     except ValueError as e:
#         raise HTTPException(status_code=401, detail=str(e))

#     # Handle different event types
#     if isinstance(event, WebhookEventChatStarted):
#         print(f"✅ Chat started: {event.dict()}")

#     elif isinstance(event, WebhookEventChatEnded):
#         print(f"✅ Chat ended: {event.dict()}")
#         transcript = await get_chat_transcript(event.chat_id)
#         # todo save ^ in db

#     return JSONResponse({"message": "Webhook received successfully"})
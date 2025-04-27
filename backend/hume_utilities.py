import os
import aiohttp
import hmac
import hashlib
from dotenv import load_dotenv
from prompts import responder
from hume import HumeClient
from hume.empathic_voice import (
    PostedConfigPromptSpec, 
    PostedWebhookSpec, 
    PostedVoice, 
    PostedEventMessageSpecs, 
    PostedEventMessageSpec)

load_dotenv()
HUME_API_KEY = os.getenv("HUME_API_KEY")
HUME_SECRET = os.getenv("HUME_SECRET")
WEBHOOK_URL = os.getenv("WEBHOOK_URL")

def config_client() -> None:
    client = HumeClient(api_key=HUME_API_KEY)

    config = client.empathic_voice.configs.create_config(
        name="Emergency Dispatcher Config 5",
        evi_version="2",
        prompt=PostedConfigPromptSpec(
            text=responder,
        ),
        voice=PostedVoice(
            provider="HUME_AI",
            name="KORA",
        ),
        event_messages=PostedEventMessageSpecs(
            on_new_chat=PostedEventMessageSpec(
                enabled=True,
                text="Hello, what is your emergency?",
            ),
            on_inactivity_timeout=PostedEventMessageSpec(
                enabled=True,
                text="",
            ),
            on_max_duration_timeout=PostedEventMessageSpec(
                enabled=True,
                text="",
            ),
        ),
        # webhooks=[
        #     PostedWebhookSpec(
        #         url="https://09e0-50-217-174-18.ngrok-free.app/hume-webhook",
        #         events=["chat_started", "chat_ended"],
        #     )
        # ],
    )

    print("Created config!")

def validate_headers(payload: str, headers) -> None:
    """
    Validate Hume webhook signature.
    """
    received_signature = headers.get("hume-signature")
    timestamp = headers.get("hume-timestamp")
    
    if not received_signature or not timestamp:
        raise ValueError("Missing signature or timestamp headers.")

    signed_payload = f"{timestamp}.{payload}".encode("utf-8")
    expected_signature = hmac.new(
        HUME_SECRET.encode("utf-8"),
        signed_payload,
        hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(received_signature, expected_signature):
        raise ValueError("Invalid Hume signature.")

async def get_chat_transcript(chat_id: str):
    """
    Fetch the chat transcript from Hume after a chat ends.
    """
    url = f"https://api.hume.ai/v0/evi/chat/{chat_id}"

    headers = {
        "Authorization": f"Bearer {HUME_API_KEY}",
        "Accept": "application/json"
    }

    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers) as response:
            if response.status != 200:
                print(f"Failed to fetch chat transcript: {response.status}")
                return None
            data = await response.json()
            print("✅ Chat Transcript Fetched!")
            return data

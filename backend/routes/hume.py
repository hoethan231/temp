from fastapi import APIRouter, HTTPException, Request
# from models import EmergencyCreate, EmergencyOut
# from db import emergency_tb

from fastapi.responses import JSONResponse
from hume.empathic_voice.types import (
    WebhookEvent,
    WebhookEventChatStarted,
    WebhookEventChatEnded
)
from hume_utilities import validate_headers, get_chat_transcript

hume_router = APIRouter(prefix="/hume", tags=[])

# For hume
# @hume_router.post("/hume-webhook")
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
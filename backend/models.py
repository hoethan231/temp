from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class EmergencyCreate(BaseModel):
    incident_type: str
    location: str
    severity: str
    injuries: int
    call_timestamp: str
    raw_transcript: str

class EmergencyOut(EmergencyCreate):
    id: str

# class CallTranscriptCreate(BaseModel):
#     caller_id: Optional[str]           # ID or phone number of the caller
#     operator_id: Optional[str]         # ID of the dispatcher/operator
#     call_timestamp: str                # ISO format timestamp (e.g., "2024-04-27T14:30:00Z")
#     raw_transcript: str                # The full text of the call
#     language: Optional[str] = "en"     # Language code, default English
#     tags: Optional[List[str]] = []     # Optional tags or keywords

class RawEvent(BaseModel):
    type: str
    chatGroupId: Optional[str]  = None
    chatId: Optional[str]       = None
    requestId: Optional[str]    = None
    message: Optional[dict]     = None
    receivedAt: Optional[datetime] = None

class ParsedCall(BaseModel):
    caller_id: Optional[str]           = None
    call_timestamp: datetime           # ISO timestamp
    raw_transcript: str                # full text
    language: Optional[str] = "en"
    tags: Optional[List[str]] = Field(default_factory=list)
    embedding: Optional[List[float]] = None


class CallTranscriptOut(ParsedCall):
    id: str                            # MongoDB ObjectId as string
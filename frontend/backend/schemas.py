from datetime import datetime
from pydantic import BaseModel, Field
from typing import List, Optional


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]


class ChatResponse(BaseModel):
    response: str


class PropertyBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    location: str
    image_url: Optional[str] = None


class PropertyCreate(PropertyBase):
    pass


class Property(PropertyBase):
    id: int

    class Config:
        orm_mode = True


class ChatMessageSchema(BaseModel):
    id: int
    role: str
    content: str
    timestamp: datetime

    class Config:
        orm_mode = True

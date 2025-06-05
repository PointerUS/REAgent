from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func

from .database import Base


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(String, index=True)
    content = Column(Text)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())


class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    price = Column(Float)
    location = Column(String, index=True)
    image_url = Column(String)

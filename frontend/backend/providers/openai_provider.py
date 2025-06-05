from typing import List
import openai
from .base import BaseProvider
from ..config import settings
from ..schemas import Message


class OpenAIProvider(BaseProvider):
    def __init__(self):
        openai.api_key = settings.OPENAI_API_KEY

    def generate(self, messages: List[Message]) -> str:
        openai_messages = [m.dict() for m in messages]
        response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=openai_messages)
        return response.choices[0].message["content"].strip()

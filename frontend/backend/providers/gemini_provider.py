from typing import List
from .base import BaseProvider
from ..schemas import Message


class GeminiProvider(BaseProvider):
    def __init__(self):
        # Placeholder for Gemini API initialization
        pass

    def generate(self, messages: List[Message]) -> str:
        # Implement Gemini API call here
        # This is a placeholder implementation
        return "(Gemini) " + messages[-1].content

from typing import List
from .schemas import Message
from .config import settings
from .providers.openai_provider import OpenAIProvider
from .providers.gemini_provider import GeminiProvider

_provider = None


def get_provider():
    global _provider
    if _provider:
        return _provider
    if settings.MODEL_PROVIDER.lower() == "gemini":
        _provider = GeminiProvider()
    else:
        _provider = OpenAIProvider()
    return _provider


def chat(messages: List[Message]) -> str:
    provider = get_provider()
    return provider.generate(messages)

from abc import ABC, abstractmethod
from typing import List
from ..schemas import Message


class BaseProvider(ABC):
    @abstractmethod
    def generate(self, messages: List[Message]) -> str:
        """Generate a response from a list of chat messages."""
        pass

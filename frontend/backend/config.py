import os

class Settings:
    MODEL_PROVIDER = os.getenv('MODEL_PROVIDER', 'openai')
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '')
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./real_estate.db')

settings = Settings()

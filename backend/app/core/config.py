import json
from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    ENV: str = "development"
    PORT: int = 8000
    ALLOWED_ORIGINS: Union[List[str], str] = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://stadiumverse-ai-alpha.vercel.app",
    "https://stadiumverse-ai.onrender.com",
]
    FIREBASE_CREDENTIALS_PATH: str = "app/core/firebase-adminsdk.json"
    GEMINI_API_KEY: str = ""

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def parse_allowed_origins(cls, value: Union[List[str], str]) -> List[str]:
        if isinstance(value, str):
            try:
                parsed = json.loads(value)
                if isinstance(parsed, list):
                    return parsed
            except json.JSONDecodeError:
                pass
            return [item.strip() for item in value.split(",") if item.strip()]
        return value

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()

from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # All fields with defaults
    PROJECT_NAME: str = "Trading Bot Admin"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080
    DATABASE_URL: str = "sqlite:///./trading_bot_admin.db"
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    TELEGRAM_BOT_TOKEN: str = ""
    TELEGRAM_BOT_USERNAME: str = ""
    FIRST_SUPERUSER_EMAIL: str = "admin@tradingbot.com"
    FIRST_SUPERUSER_PASSWORD: str = "Admin123!"
    MAINTENANCE_MODE: bool = False
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"  # This is crucial for Pydantic v2

settings = Settings()

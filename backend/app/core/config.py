from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "AI Platform"
    API_V1_STR: str = "/api"
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    DATABASE_URL: str
    CORS_ORIGINS: list[str] = ["http://localhost:3000"]
    
    # AWS Configuration
    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str
    S3_BUCKET: str = "ai-platform-models"
    
    class Config:
        env_file = ".env"

settings = Settings()

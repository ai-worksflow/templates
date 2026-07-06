from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="APP_", env_file=".env", extra="ignore")

    service_name: str = "python-fastapi-template"
    database_url: str = "sqlite+pysqlite:///:memory:"
    cors_origins: list[str] = ["*"]
    auth_cookie_name: str = "session"

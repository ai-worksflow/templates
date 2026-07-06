from fastapi import FastAPI

from app.api.routes.identity import build_identity_router
from app.main.config import Settings
from app.main.ioc import Container


def make_app() -> FastAPI:
    settings = Settings()
    container = Container()
    app = FastAPI(title=settings.service_name)

    @app.get("/healthz")
    async def healthz() -> dict[str, str]:
        return {"status": "ok"}

    @app.get("/readyz")
    async def readyz() -> dict[str, object]:
        return {"status": "ready", "service": settings.service_name}

    app.include_router(build_identity_router(container.register_user()))
    return app

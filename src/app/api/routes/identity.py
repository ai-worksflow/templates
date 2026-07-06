from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from app.contexts.identity.application.register_user import (
    RegisterUser,
    RegisterUserCommand,
    UserAlreadyExists,
)

router = APIRouter(prefix="/identity", tags=["identity"])


class RegisterUserRequest(BaseModel):
    email: EmailStr
    display_name: str


def build_identity_router(register_user: RegisterUser) -> APIRouter:
    @router.post("/users", status_code=201)
    async def create_user(request: RegisterUserRequest) -> dict[str, str]:
        try:
            result = await register_user.execute(
                RegisterUserCommand(email=request.email, display_name=request.display_name)
            )
        except UserAlreadyExists as exc:
            raise HTTPException(status_code=409, detail=str(exc)) from exc
        return {"user_id": result.user_id, "email": result.email}

    return router

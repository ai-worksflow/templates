from typing import Protocol

from app.contexts.identity.domain.user import User


class UserRepository(Protocol):
    async def save(self, user: User) -> None: ...

    async def find_by_email(self, email: str) -> User | None: ...

from app.contexts.identity.domain.user import User


class MemoryUserRepository:
    def __init__(self) -> None:
        self._users_by_email: dict[str, User] = {}

    async def save(self, user: User) -> None:
        self._users_by_email[user.email] = user

    async def find_by_email(self, email: str) -> User | None:
        return self._users_by_email.get(email.strip().lower())


class MemoryUnitOfWork:
    async def commit(self) -> None:
        return None

    async def rollback(self) -> None:
        return None

from app.contexts.identity.adapters.persistence.memory import MemoryUnitOfWork, MemoryUserRepository
from app.contexts.identity.application.register_user import RegisterUser


class Container:
    def __init__(self) -> None:
        self.users = MemoryUserRepository()
        self.uow = MemoryUnitOfWork()

    def register_user(self) -> RegisterUser:
        return RegisterUser(self.users, self.uow)

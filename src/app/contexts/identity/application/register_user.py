from dataclasses import dataclass

from app.contexts.identity.domain.user import User
from app.contexts.identity.ports.unit_of_work import UnitOfWork
from app.contexts.identity.ports.user_repository import UserRepository


class UserAlreadyExists(ValueError):
    pass


@dataclass(frozen=True)
class RegisterUserCommand:
    email: str
    display_name: str


@dataclass(frozen=True)
class RegisterUserResult:
    user_id: str
    email: str


class RegisterUser:
    def __init__(self, users: UserRepository, uow: UnitOfWork) -> None:
        self.users = users
        self.uow = uow

    async def execute(self, command: RegisterUserCommand) -> RegisterUserResult:
        if await self.users.find_by_email(command.email):
            raise UserAlreadyExists("user already exists")

        user = User.register(command.email, command.display_name)
        await self.users.save(user)
        await self.uow.commit()
        return RegisterUserResult(user_id=user.id, email=user.email)

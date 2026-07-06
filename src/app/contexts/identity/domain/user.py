from dataclasses import dataclass
from datetime import UTC, datetime
from uuid import uuid4


class InvalidUser(ValueError):
    pass


@dataclass(frozen=True)
class User:
    id: str
    email: str
    display_name: str
    created_at: datetime

    @classmethod
    def register(cls, email: str, display_name: str) -> "User":
        normalized_email = email.strip().lower()
        normalized_name = display_name.strip()
        if "@" not in normalized_email or not normalized_name:
            raise InvalidUser("invalid user")
        return cls(
            id=f"usr_{uuid4().hex}",
            email=normalized_email,
            display_name=normalized_name,
            created_at=datetime.now(UTC),
        )

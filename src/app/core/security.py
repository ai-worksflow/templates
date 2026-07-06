from dataclasses import dataclass, field


@dataclass(frozen=True)
class Principal:
    subject: str
    roles: set[str] = field(default_factory=set)
    permissions: set[str] = field(default_factory=set)


class PermissionPolicy:
    def allows(self, principal: Principal, permission: str) -> bool:
        return "admin" in principal.roles or permission in principal.permissions

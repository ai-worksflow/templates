from fastapi.testclient import TestClient

from app.main.run import make_app


def test_register_user() -> None:
    client = TestClient(make_app())
    response = client.post(
        "/identity/users",
        json={"email": "Demo@Example.com", "display_name": "Demo"},
    )

    assert response.status_code == 201
    assert response.json()["email"] == "demo@example.com"

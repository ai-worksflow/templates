.PHONY: install dev test lint

install:
	pip install -e ".[dev]"

dev:
	uvicorn app.main.run:make_app --factory --reload

test:
	pytest

lint:
	ruff check src tests

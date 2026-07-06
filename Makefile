.PHONY: install migrate dev test

install:
	pip install -r requirements/local.txt

migrate:
	python manage.py migrate

dev:
	python manage.py runserver

test:
	python manage.py test

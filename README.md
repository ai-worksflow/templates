# Python Django Template

Production Django backend template profile based on Cookiecutter Django conventions.

This template is for traditional web, admin-heavy systems, content workflows, e-commerce back offices, and projects where Django's batteries-included model is the right backend foundation.

## Upstream

- `cookiecutter/cookiecutter-django`, BSD-3-Clause project.

## Quick Start

```bash
python -m venv .venv
. .venv/bin/activate
pip install -r requirements/local.txt
python manage.py migrate
python manage.py runserver
```

## Structure

```text
config/settings/      base/local/production/test settings.
apps/users/           custom user model and user admin boundary.
apps/common/          shared models, service helpers, and utilities.
requirements/         layered dependency files.
deploy/               deployment assets.
```

## Why Django Profile Exists

Do not force FastAPI patterns onto Django-heavy applications. Use this profile when you want Django ORM, admin, auth, forms, template rendering, Celery, and operational settings as first-class project primitives.

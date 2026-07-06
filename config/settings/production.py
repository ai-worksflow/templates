from config.settings.base import *  # noqa: F403

DEBUG = False
ALLOWED_HOSTS = ["example.com"]
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

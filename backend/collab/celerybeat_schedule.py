from celery.schedules import crontab


CELERYBEAT_SCHEDULE = {
    # Internal tasks
    "clearsessions": {"schedule": crontab(hour=3, minute=0), "task": "users.tasks.clearsessions"},
    "testPrint": {"schedule": crontab(hour=0, minute=1), "task": "users.tasks.testPrint"},
}

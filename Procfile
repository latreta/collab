web: gunicorn collab.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: celery worker --workdir backend --app=collab -B --loglevel=info

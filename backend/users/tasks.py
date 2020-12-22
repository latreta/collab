from django.core import management

from collab import celery_app
from repositories.models import Repository


@celery_app.task
def clearsessions():
    management.call_command('clearsessions')

@celery_app.task
def testPrint():
    repository = Repository(name='Testerepo', full_name='RepoTask', user_id=1)
    repository.save()
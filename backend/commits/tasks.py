from collab import celery_app
from celery import shared_task

from repositories.models import Repository
from commits.models import Commit


@celery_app.task
@shared_task
def save_new_commit(repository, commit):
    author = commit['author']
    c = Commit(message=commit['message'][:100], author=author['name'], commit_date=commit['timestamp'],
               commit_id=commit['id'], repository=repository)
    c.save()

@celery_app.task
@shared_task
def save_new_commits(github_repository, commits):
    repository = Repository.objects.get(full_name=github_repository['full_name'])
    for commit in commits:
        save_new_commit(repository, commit)

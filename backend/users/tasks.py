from django.core import management

from collab import celery_app

from github import Github


def create_github_user_instance(token):
    g = Github(login_or_token=token)
    return g.get_user()

@celery_app.task
def clearsessions():
    management.call_command('clearsessions')

@celery_app.task
def retrieve_github_user_avatar(token):
    github_user = create_github_user_instance(token)
    return github_user.avatar_url

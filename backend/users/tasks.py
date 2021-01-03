from django.core import management

from collab import celery_app

from github import Github

from .models import User


@celery_app.task
def clearsessions():
    management.call_command('clearsessions')


@celery_app.task
def UpdateUserPicture(user):
    g = Github()
    github_user = g.get_user(user.username)
    avatar_url = github_user.avatar_url
    user.profile_picture = avatar_url
    user.save()

@celery_app.task
def UpdateUsersProfilePictures():
    users = User.objects.filter(is_staff=False)
    for user in users:
        UpdateUserPicture(user)

from allauth.socialaccount.models import SocialToken, SocialAccount
from django.http import HttpResponse
from django.core import serializers
from github import Github

from .models import Repository


def index(request):
    account = SocialAccount.objects.filter(user=request.user)[:1]
    socialToken = SocialToken.objects.filter(account=account)[:1].values("token")
    userToken = socialToken[0]['token']
    g = Github(userToken)

    specificRepo = g.get_repo("latreta/pomodoroApp")
    for commit in specificRepo.get_commits():
        print(commit.commit.message)

    repositories = Repository.objects.all()
    return HttpResponse(g.get_user().get_repos(), content_type="text/json-comment-filtered")

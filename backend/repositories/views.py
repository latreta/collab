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
    # Then play with your Github objects:
    for repo in g.get_user().get_repos():
        print(repo.name)

    repositories = Repository.objects.all()
    return HttpResponse(g.get_user().get_repos(), content_type="text/json-comment-filtered")

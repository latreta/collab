from allauth.socialaccount.models import SocialToken, SocialAccount
from django.http import HttpResponse
from django.core import serializers
from github import Github
from datetime import datetime, timedelta

from .models import Repository
from commits.models import Commit


def index(request):
    account = SocialAccount.objects.filter(user=request.user)[:1]
    socialToken = SocialToken.objects.filter(account=account)[:1].values("token")
    userToken = socialToken[0]['token']
    g = Github(userToken)
    login = g.get_user().login
    specificRepo = g.get_repo(f"{login}/aulas-api")
    start_date = datetime.now() - timedelta(150)
    
    for commit in specificRepo.get_commits(since=start_date):
        objectCommit = commit.commit
        print(f'Autor: {objectCommit.author.name}')
        print(f'Data do commit: {objectCommit.author.date}')
        print(f'Mensagem: {objectCommit.message[:100]}\n')
        print(f'ID do commit: {commit.sha}')

    repositories = Repository.objects.all()
    return HttpResponse(repositories, content_type="text/json-comment-filtered")

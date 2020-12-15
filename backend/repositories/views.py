from allauth.socialaccount.models import SocialToken, SocialAccount
from django.http import HttpResponse
from github import Github
from datetime import datetime, timedelta

from .models import Repository
from commits.models import Commit


def index(request):
    user = request.user
    repositories = Repository.objects.filter(user_id=user.id)
    return HttpResponse([repositories], content_type="text/json-comment-filtered")


def get_repository(request):
    account = SocialAccount.objects.filter(user=request.user)[:1]
    socialToken = SocialToken.objects.filter(account=account)[:1].values("token")
    userToken = socialToken[0]['token']
    g = Github(userToken)
    start_date = datetime.now() - timedelta(150)
    login = g.get_user().login
    specificRepo = g.get_repo(f"{request.POST['repository']}")

    repository = Repository(name=specificRepo.name, full_name=specificRepo.full_name, user_id=request.user)

    repository.save()

    for commit in specificRepo.get_commits(since=start_date):
        objectCommit = commit.commit
        c = Commit(message=objectCommit.message[:100], author=objectCommit.author.name, commit_date=objectCommit.author.date, commit_id=commit.sha, repository_id=repository)
        print(f'Autor: {objectCommit.author.name}')
        print(f'Data do commit: {objectCommit.author.date}')
        print(f'Mensagem: {objectCommit.message[:100]}\n')
        print(f'ID do commit: {commit.sha}')
        c.save()

    return HttpResponse([], content_type="text-/json-comment-filtered")

import json

from allauth.socialaccount.models import SocialToken, SocialAccount
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from github import Github
from datetime import datetime, timedelta
from pytz import timezone

from .models import Repository
from commits.models import Commit
from django.conf import settings


# ENDPOINT = 'app/webhook/'
ENDPOINT = settings.WEBHOOK_ENDPOINT
GMT_TIMEZONE = timezone('GMT')
SAO_PAULO_TIMEZONE = timezone('America/Sao_Paulo')
EVENTS = ['push']
HOST = settings.WEBHOOK_HOST
DAYS_PAST = 250


def create_webhook(repository):
    config = {
        "url": "http://{host}/{endpoint}".format(host=HOST, endpoint=ENDPOINT),
        "content_type": "json"
    }
    repository.create_hook("web", config, EVENTS, active=True)


def get_repository(request):
    account = SocialAccount.objects.get(user=request.user)
    socialToken = SocialToken.objects.get(account=account)
    userToken = socialToken.token
    payload = json.loads(request.body)
    g = Github(login_or_token=userToken)

    login = g.get_user().login
    githubRepository = g.get_repo("{usuario}/{repositorio}"
                            .format(usuario=login, repositorio=payload['repository']))
    create_webhook(githubRepository)

    repository = Repository(name=githubRepository.name, full_name=githubRepository.full_name, user=request.user)
    repository.save()

    start_date = datetime.now() - timedelta(DAYS_PAST)

    for commit in githubRepository.get_commits(since=start_date):
        objectCommit = commit.commit
        dataoriginal = objectCommit.author.date
        commitDate = GMT_TIMEZONE.localize(dataoriginal)
        convertedToBRTDate = commitDate.astimezone(SAO_PAULO_TIMEZONE)
        c = Commit(message=objectCommit.message[:100], author=objectCommit.author.name, commit_date=convertedToBRTDate, commit_id=commit.sha, repository=repository)
        c.save()

    return HttpResponse("Sucesso")

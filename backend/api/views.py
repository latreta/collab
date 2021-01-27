import json

from allauth.socialaccount.models import SocialAccount, SocialToken
from requests import Response
from rest_framework import generics
from rest_framework.decorators import api_view

from .serializers import CommitSerializer
from commits.models import Commit
from repositories.models import Repository
from github import Github
from django.conf import settings
from datetime import datetime, timedelta
from rest_framework.views import APIView
from pytz import timezone

# ENDPOINT = 'app/webhook/'
ENDPOINT = settings.WEBHOOK_ENDPOINT
GMT_TIMEZONE = timezone('GMT')
SAO_PAULO_TIMEZONE = timezone('America/Sao_Paulo')
EVENTS = ['push']
# HOST = "http://6a8326daad4a.ngrok.io"
HOST = settings.WEBHOOK_HOST
DAYS_PAST = 150


def create_webhook(repository):
    config = {
        "url": "http://{host}/{endpoint}".format(host=HOST, endpoint=ENDPOINT),
        "content_type": "json"
    }
    repository.create_hook("web", config, EVENTS, active=True)


@api_view(['POST'])
def get_repository_from_github(self, request, *args, **kwargs):
    account = SocialAccount.objects.get(user=request.user)
    socialToken = SocialToken.objects.get(account=account)
    userToken = socialToken.token
    payload = json.loads(request.body)
    g = Github(login_or_token=userToken)

    login = g.get_user().login
    githubRepository = g.get_repo("{usuario}/{repositorio}"
                                  .format(usuario=login, repositorio=payload['repository']))
    self.create_webhook(githubRepository)

    repository = Repository(name=githubRepository.name, full_name=githubRepository.full_name, user=request.user)
    repository.save()

    start_date = datetime.now() - timedelta(DAYS_PAST)

    for commit in githubRepository.get_commits(since=start_date):
        objectCommit = commit.commit
        dataoriginal = objectCommit.author.date
        commitDate = GMT_TIMEZONE.localize(dataoriginal)
        convertedToBRTDate = commitDate.astimezone(SAO_PAULO_TIMEZONE)
        c = Commit(message=objectCommit.message[:100], author=objectCommit.author.name,
                   commit_date=convertedToBRTDate, commit_id=commit.sha, repository=repository)
        c.save()
    return Response({"message": "Hello, world!"})


class RepositoriesCommitsView(generics.ListAPIView):
    serializer_class = CommitSerializer

    def get_queryset(self):
        queryset = Commit.objects.filter(repository__name=self.kwargs['repository_name'], repository__user=self.request.user)
        return queryset;

from allauth.socialaccount.models import SocialToken, SocialAccount
from django.http import HttpResponse
from django.utils.timezone import make_aware
from github import Github
from datetime import datetime, timedelta
from pytz import timezone

from .models import Repository
from commits.models import Commit

HOST = 'http://bc7f9734b75a.ngrok.io'
ENDPOINT = 'app/webhook/'

GMT_TIMEZONE = timezone('GMT')
SAO_PAULO_TIMEZONE = timezone('America/Sao_Paulo')



def create_webhook(repository):
    EVENTS = ['push']
    HOST = "http://bc7f9734b75a.ngrok.io"

    config = {
        "url": "http://{host}/{endpoint}".format(host=HOST, endpoint=ENDPOINT),
        "content_type": "json"
    }

    repository.create_hook("web", config, EVENTS, active=True)


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
    githubRepository = g.get_repo(f"{request.POST['repository']}")

    # create_webhook(githubRepository)

    repository = Repository(name=githubRepository.name, full_name=githubRepository.full_name, user_id=request.user)
    repository.save()

    for commit in githubRepository.get_commits(since=start_date):
        objectCommit = commit.commit
        dataoriginal = objectCommit.author.date
        commitDate = GMT_TIMEZONE.localize(dataoriginal)
        convertedToBRTDate = commitDate.astimezone(SAO_PAULO_TIMEZONE)
        c = Commit(message=objectCommit.message[:100], author=objectCommit.author.name, commit_date=convertedToBRTDate, commit_id=commit.sha, repository_id=repository)
        c.save()

    return HttpResponse("Sucesso")

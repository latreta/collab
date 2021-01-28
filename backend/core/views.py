from allauth.socialaccount.models import SocialAccount, SocialToken
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from github import Github
import json


from commits.tasks import save_new_commits

ENDPOINT = 'app/webhook/'

@login_required()
def index(request):
    template = loader.get_template('core/index.html')
    return HttpResponse(template.render({}, request))


def retrieve_commits(payload):
    commits = payload['commits']
    repository = payload['repository']
    save_new_commits.delay(repository, commits)

@csrf_exempt
class PayloadView:

    @csrf_exempt
    def handle_webhook(self):
        payload = json.loads(self.body)
        if 'commits' in payload.keys():
            retrieve_commits(payload)
        return HttpResponse("Success")

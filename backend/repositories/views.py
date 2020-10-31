from django.http import HttpResponse
from django.core import serializers

from .models import Repository


def index(request):
    repositories = Repository.objects.all()
    repositories = serializers.serialize("json", repositories)
    return HttpResponse(repositories, content_type="text/json-comment-filtered")
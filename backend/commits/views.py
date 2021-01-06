from django.shortcuts import render  # noqa
from django.http import HttpResponse
from django.core import serializers
from .models import Commit

from repositories.models import Repository


def get_commits(request):
    commits = Commit.objects.all()
    commits = serializers.serialize("json", commits)
    return HttpResponse(commits, content_type="text/json-comment-filtered")


def get_repository_commits(request, repository_name):
    try:
        repository_queryset = Repository.objects.get(name=repository_name, user_id=request.user)
        commits_results = Commit.objects.filter(repository_id=repository_queryset)

        response_json = serializers.serialize("json", commits_results)
        return HttpResponse(response_json, content_type="text/json-comment-filtered")

    except Repository.DoesNotExist:
        return HttpResponse("Repository not found", status=404, content_type="text/json-comment-filtered")
    except Commit.DoesNotExist:
        return HttpResponse("Commits not found", status=404, content_type="text/json-comment-filtered")

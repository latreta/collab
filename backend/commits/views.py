from django.shortcuts import render  # noqa
from django.http import HttpResponse
from django.core import serializers
from .models import Commit

from repositories.models import Repository


def get_commits(request):
    commits = Commit.objects.filter(repository_id__in=Repository.objects.filter(user_id=request.user)).order_by("-commit_date")
    commits = serializers.serialize("json", commits, indent=2, use_natural_foreign_keys=True)
    return HttpResponse(commits, content_type="text/json-comment-filtered")


def get_repository_commits(request, repository_owner, repository_name):
    try:
        repository_queryset = Repository.objects.get(name=repository_name, user_id=request.user)
        commits_results = Commit.objects.filter(repository_id=repository_queryset)

        response_json = serializers.serialize("json", commits_results, indent=2, use_natural_foreign_keys=True)
        return HttpResponse(response_json, content_type="text/json-comment-filtered")

    except Repository.DoesNotExist:
        return HttpResponse("Repository not found", status=404, content_type="text/json-comment-filtered")
    except Commit.DoesNotExist:
        return HttpResponse("Commits not found", status=404, content_type="text/json-comment-filtered")

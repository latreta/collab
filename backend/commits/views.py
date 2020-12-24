from django.shortcuts import render  # noqa
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from .models import Commit


def index(request):
    commits = Commit.objects.all()
    commits = serializers.serialize("json", commits)
    return HttpResponse(commits, content_type="text/json-comment-filtered")


def get_commits(request):
    commits = Commit.objects.all()
    commits = serializers.serialize("json", commits)
    return HttpResponse(commits, content_type="text/json-comment-filtered")

from django.core.paginator import Paginator, EmptyPage
from django.http import HttpResponse
from django.core import serializers
from .models import Commit

from repositories.models import Repository


CONTENT_TYPE = "text/json-comment-filtered"

def get_commits(request, page=1):
    commits = Commit.objects.filter(repository_id__in=Repository.objects.filter(user_id=request.user)).order_by("-commit_date")
    paginator = Paginator(commits, 6)
    try:
        commits = paginator.page(page)
        results = serializers.serialize("json", commits, indent=2, use_natural_foreign_keys=True)
    except EmptyPage:
        response = [{"message": "Não existem mais registros"}]
        return HttpResponse(response, status=404, content_type=CONTENT_TYPE)

    return HttpResponse(results, content_type="text/json-comment-filtered")


def get_repository_commits(request, repository_name, page=1):
    try:
        repository_queryset = Repository.objects.get(name=repository_name, user_id=request.user)
        commits_results = Commit.objects.filter(repository_id=repository_queryset)
        paginator = Paginator(commits_results, 6)
        try:
            commits = paginator.page(page)
            response_json = serializers.serialize("json", commits, indent=2, use_natural_foreign_keys=True)
        except EmptyPage:
            return HttpResponse({"message": "Não existem mais registros"}, status=404, content_type=CONTENT_TYPE)
        return HttpResponse(response_json, content_type=CONTENT_TYPE)

    except Repository.DoesNotExist:
        return HttpResponse("Repository not found", status=404, content_type=CONTENT_TYPE)
    except Commit.DoesNotExist:
        return HttpResponse("Commits not found", status=404, content_type=CONTENT_TYPE)

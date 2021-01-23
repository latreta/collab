from commits.models import Commit
from repositories.models import Repository
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from .serializers import CommitSerializer, RepositorySerializer, RepositoryAndCommitsSerializer


class CommitViewSet(ReadOnlyModelViewSet):
    serializer_class = CommitSerializer
    lookup_field = "commit_id"

    def get_queryset(self):
        return Commit.objects.filter(repository_id__user_id=self.request.user)


class RepositoryViewSet(ReadOnlyModelViewSet):
    serializer_class = RepositorySerializer
    lookup_field = "name"

    def get_queryset(self):
        return Repository.objects.select_related('user_id').filter(user_id=self.request.user)


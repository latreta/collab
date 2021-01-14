from commits.models import Commit
from repositories.models import Repository
from rest_framework.viewsets import ReadOnlyModelViewSet

from .serializers import CommitSerializer, RepositorySerializer


class CommitViewSet(ReadOnlyModelViewSet):
    serializer_class = CommitSerializer

    def get_queryset(self):
        return Commit.objects.filter(repository_id__in=Repository.objects.filter(user_id=self.request.user))


class RepositoryViewSet(ReadOnlyModelViewSet):
    serializer_class = RepositorySerializer
    lookup_field = "name"

    def get_queryset(self):
        return Repository.objects.filter(user_id=self.request.user)

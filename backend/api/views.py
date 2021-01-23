from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from .serializers import CommitSerializer
from commits.models import Commit


class RepositoriesCommitsView(generics.ListAPIView):
    serializer_class = CommitSerializer

    def get_queryset(self):
        queryset = Commit.objects.filter(repository_id__name=self.kwargs['repository_name'], repository_id__user_id=self.request.user)
        return queryset;

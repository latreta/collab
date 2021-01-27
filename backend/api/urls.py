from django.conf.urls import include, url  # noqa
from django.urls import path, re_path
from rest_framework import routers

from .viewsets import CommitViewSet, RepositoryViewSet
from .views import RepositoriesCommitsView, get_repository_from_github

router = routers.DefaultRouter()
router.register(r'commits', CommitViewSet, basename="commits")
router.register(r'repositories', RepositoryViewSet, basename="repositories")

urlpatterns = [
    path("", include(router.urls)),
    re_path('^repositories/(?P<repository_name>.+)/commits/$', RepositoriesCommitsView.as_view())
]

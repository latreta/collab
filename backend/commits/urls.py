from django.urls import path, include
from .views import get_commits,get_repository_commits

urlpatterns = [
    path("<int:repository_id>/", get_repository_commits, name="repository_commits"),
    path("", get_commits, name="commits_index"),
]

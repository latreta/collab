from django.urls import path, include
from .views import index, get_commits

urlpatterns = [
    path("", get_commits, name="commits_index")
]

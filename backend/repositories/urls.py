from django.conf.urls import include, url
from django.shortcuts import redirect
from django.urls import path

from .views import index, get_repository, detail


urlpatterns = [
    path("criar/", get_repository, name="criar_repositorio"),
]

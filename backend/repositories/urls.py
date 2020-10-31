from django.conf.urls import include, url
from django.shortcuts import redirect
from django.urls import path

from .views import index



urlpatterns = [
    path("", index, name="test"),
]
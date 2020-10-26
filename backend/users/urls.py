from django.conf.urls import include, url  # noqa
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect

from users.views import test_view

import django_js_reverse.views


urlpatterns = [
    path("", test_view, name="test")
]

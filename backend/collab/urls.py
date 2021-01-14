from django.conf.urls import include, url  # noqa
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect

import django_js_reverse.views
from rest_framework import routers

from api.viewsets import CommitViewSet, RepositoryViewSet

router = routers.DefaultRouter()
router.register(r'commits', CommitViewSet, basename="commits2")
router.register(r'repositories', RepositoryViewSet, basename="repositories2")

urlpatterns = [
    path("", lambda request : redirect("/accounts/login")),
    path("accounts/", include("allauth.urls")),
    path("app/", include("core.urls"), name="core"),
    path("user/", include("users.urls"), name="users"),
    path("admin/", admin.site.urls, name="admin"),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path("teste/", include(router.urls)),
    path("api/commits/", include("commits.urls"), name="commits"),
    path("api/repositories/", include("repositories.urls"), name="repositories")
]

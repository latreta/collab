from django.conf.urls import include, url  # noqa
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect

import django_js_reverse.views


urlpatterns = [
    path("", lambda request : redirect("/accounts/login")),
    path("accounts/", include("allauth.urls")),
    path("app/", include("core.urls"), name="core"),
    path("admin/", admin.site.urls, name="admin"),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path("commits/", include("commits.urls"), name="commits"),
    path("repositories/", include("repositories.urls"), name="repositories")
]

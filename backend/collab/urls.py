from django.conf.urls import include, url  # noqa
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect

import django_js_reverse.views

urlpatterns = [
    path("", lambda request : redirect("/accounts/login")),
    path("accounts/", include("allauth.urls")),
    path("app/", include("core.urls"), name="core"),
    path("user/", include("users.urls"), name="users"),
    path("admin/", admin.site.urls, name="admin"),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path("api/commits/", include("commits.urls"), name="commits"),
    path("api/repositories/", include("repositories.urls"), name="repositories")
]

from django.conf.urls import include, url  # noqa
from django.urls import path, re_path
from django.contrib import admin
from django.shortcuts import redirect

import django_js_reverse.views


urlpatterns = [
    path("", lambda request : redirect("/accounts/login")),
    path("accounts/", include('allauth.urls')),
    path("app/", include("exampleapp.urls"), name="exampleapp"),
    path("admin/", admin.site.urls, name="admin"),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
]

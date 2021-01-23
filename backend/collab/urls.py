from django.conf.urls import include
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect
from django.conf import settings
from django.conf.urls.static import static

import django_js_reverse.views

urlpatterns = [
    path("", lambda request : redirect("/accounts/login")),
    path("accounts/", include("allauth.urls")),
    path("app/", include("core.urls"), name="core"),
    path("user/", include("users.urls"), name="users"),
    path("admin/", admin.site.urls, name="admin"),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path("api/", include("api.urls"), name="api"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

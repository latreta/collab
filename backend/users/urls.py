from django.urls import path, include

from .views import get_user_data

urlpatterns = [
    path("", get_user_data, name="user_data"),
]

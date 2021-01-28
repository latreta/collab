from django.urls import path

from .views import get_repository


urlpatterns = [
    path("criar/", get_repository, name="criar_repositorio"),
]

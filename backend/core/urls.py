from django.urls import path, re_path
from .views import PayloadView

app_name = 'core'

urlpatterns = [
    path("webhook/", PayloadView.handle_webhook, name='webhook'),
    # re_path(r'^', views.index, name='index'),
]

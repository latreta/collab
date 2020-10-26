from django.shortcuts import render  # noqa
from django.http import JsonResponse
from django.core import serializers
from users.models import User

# Create your views here.

def test_view(request):
    users = User.objects.all()
    data = serializers.serialize("json", users)
    return JsonResponse(data, safe=False)
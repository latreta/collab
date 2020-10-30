from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.utils import timezone
from django.views import generic

from .models import Choice, Question


# Create your views here.


class IndexView(generic.ListView):
    template_name = 'exampleapp/index.html'

    def get_queryset(self):
        return None

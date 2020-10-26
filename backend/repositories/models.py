from django.db import models

# Create your models here.

class Repository(models.Model):
    name = models.CharField(max_length=120, null=False, blank=False)
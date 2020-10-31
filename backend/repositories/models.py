from django.db import models

# Create your models here.

class Repository(models.Model):
    name = models.CharField(max_length=120, null=False, blank=False)
    full_name = models.CharField(max_length=120)

    def __str__(self):
        return self.full_name

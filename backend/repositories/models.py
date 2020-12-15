from django.db import models

# Create your models here.
from users.models import User


class Repository(models.Model):
    name = models.CharField(max_length=120, null=False, blank=False)
    full_name = models.CharField(max_length=120)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.full_name

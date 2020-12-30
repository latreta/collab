from django.db import models
from users.models import User


class Repository(models.Model):
    name = models.CharField(max_length=120, null=False, blank=False)
    full_name = models.CharField(max_length=120, unique=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.full_name

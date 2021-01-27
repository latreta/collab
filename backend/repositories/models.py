from django.db import models
from users.models import User


class RepositoryManager(models.Manager):
    def get_by_natural_key(self, full_name):
        return self.get(full_name=full_name)


class Repository(models.Model):
    name = models.CharField(max_length=120, null=False, blank=False)
    full_name = models.CharField(max_length=120, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    objects = RepositoryManager()

    def __str__(self):
        return self.full_name

    class Meta:
        ordering = ['full_name']

    def natural_key(self):
        return {"repository_name": self.name, "repository_owner": self.user.username}


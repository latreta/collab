from django.db import models
from repositories.models import Repository


class Commit(models.Model):
    message = models.CharField(max_length=250)
    author = models.CharField(max_length=50)
    commit_date = models.DateTimeField('commited at')
    commit_id = models.CharField(max_length=300, unique=True)
    repository_id = models.ForeignKey(Repository, on_delete=models.CASCADE)

    def __str__(self):
        return self.message


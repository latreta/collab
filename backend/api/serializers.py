from rest_framework import serializers
from rest_framework.serializers import ModelSerializer


from commits.models import Commit
from repositories.models import Repository


class RepositorySerializer(ModelSerializer):

    class Meta:
        model = Repository
        lookup_field = "name"
        fields = ['id', 'name', 'full_name']


class CommitSerializer(ModelSerializer):
    commit_date = serializers.DateTimeField(format="%d/%m/%Y %H:%M")
    repository = serializers.SerializerMethodField()

    class Meta:
        model = Commit
        fields = ['id', 'message', 'author', 'commit_date', 'commit_id', 'repository']

    def get_repository(self, obj):
        return obj.repository_id.name

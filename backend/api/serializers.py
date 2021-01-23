from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from commits.models import Commit
from repositories.models import Repository
from users.models import User


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['username']

class CommitSerializer(ModelSerializer):
    commit_date = serializers.DateTimeField(format="%d/%m/%Y %H:%M")
    repository = serializers.SerializerMethodField()

    class Meta:
        model = Commit
        fields = ['id', 'message', 'author', 'commit_date', 'commit_id', 'repository']

    def get_repository(self, obj):
        return obj.repository_id.name


class RepositorySerializer(ModelSerializer):
    owner = serializers.SerializerMethodField()

    class Meta:
        model = Repository
        lookup_field = "name"
        fields = ['id', 'name', 'full_name', 'owner']

    def get_owner(self, obj):
        return obj.user_id.username


class RepositoryAndCommitsSerializer(ModelSerializer):
    commits = CommitSerializer(many=True)
    user = serializers.SerializerMethodField()

    class Meta:
        model = Repository
        lookup_field = "name"
        fields = ['id', 'name', 'full_name', 'commits', 'user']

    def get_user(self, obj):
        return obj.user_id.username

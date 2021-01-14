from rest_framework.serializers import ModelSerializer


from commits.models import Commit
from repositories.models import Repository

class CommitSerializer(ModelSerializer):

    class Meta:
        model = Commit
        fields = ['id', 'message', 'author', 'commit_date', 'commit_id', 'repository_id']


class RepositorySerializer(ModelSerializer):

    class Meta:
        model = Repository
        lookup_field = "name"
        fields = ['id', 'name', 'full_name']


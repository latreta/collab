from allauth.socialaccount.models import SocialAccount, SocialToken
from django.http import JsonResponse
from github import Github

from .tasks import retrieve_github_user_avatar


def get_user_data(request):
    user = request.user
    account = SocialAccount.objects.get(user=user)
    socialToken = SocialToken.objects.get(account=account)
    userToken = socialToken.token

    if user.profile_picture == "":
        user.profile_picture = retrieve_github_user_avatar(userToken)
        user.save()

    if user:
        name = user.username
        profile_pic = user.profile_picture
        response = {"username": name, "profile_picture": profile_pic}
        return JsonResponse(response)


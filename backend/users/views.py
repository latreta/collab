from allauth.socialaccount.models import SocialAccount
from django.http import JsonResponse


def get_user_data(request):
    socialUser = SocialAccount.objects.get(user=request.user)
    name = socialUser.extra_data['login']
    profile_pic = socialUser.extra_data['avatar_url']
    response = {"username": name, "profile_picture": profile_pic}
    return JsonResponse(response)



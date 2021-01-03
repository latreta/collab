from django.http import JsonResponse


def get_user_data(request):
    user = request.user
    if user:
        name = user.username
        profile_pic = user.profile_picture
        response = {"username": name, "profile_picture": profile_pic}
        return JsonResponse(response)


from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from .decorators import unauthenticated_user, allowed_users


# Lists for decorator '@allowed_users'
ALLOWED_ALL = [
	'Administrator',
]

ALLOWED_RESTRICTED = [
	'Administrator',
]

ALLOWED_ADMIN = [
	'Administrator',
]

# Create your views here.
@unauthenticated_user
def loginPage(request):
	if request.user.is_authenticated:
		return redirect('main')
	else:
		if request.method == 'POST':
			username = request.POST.get('username')
			password = request.POST.get('password')
			user = authenticate(request, username=username, password=password)

			if user is not None:
				login(request, user)
				return redirect('frontend-main')
			else:
				messages.info(request, 'Benutzername oder Passwort stimmen nicht überein!')

		return render(request, 'frontend/login.html')


def logoutUser(request):
	logout(request)
	return redirect('login')


@login_required(login_url='login')
@allowed_users(allowed_roles=ALLOWED_ALL)
def frontend_main(request):
    return render(request, 'frontend/main.html')


@login_required(login_url='login')
@allowed_users(allowed_roles=ALLOWED_ALL)
def frontend_languages(request):
    return render(request, 'frontend/languages.html')


@login_required(login_url='login')
@allowed_users(allowed_roles=ALLOWED_ALL)
def frontend_resume(request):
    return render(request, 'frontend/resume.html')

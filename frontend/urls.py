from django.urls import path
from . import views


urlpatterns = [
    # login & logout
    path('login/', views.loginPage, name="login"),
	path('logout/', views.logoutUser, name="logout"),

    # templates
    path('', views.frontend_main, name="frontend-main"),
    path('languages/', views.frontend_languages, name="frontend-languages"),
    path('resume/', views.frontend_resume, name="frontend-resume"),
]

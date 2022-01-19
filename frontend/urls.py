from django.urls import path
from . import views


urlpatterns = [
    # templates
    path('', views.frontend_main, name="frontend-main"),
]

from unicodedata import name
from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name="app-3d-world-index"),
]
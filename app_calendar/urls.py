from django.urls import path
from . import api, views

urlpatterns = [
    # templates
    path('', views.app_calendar_index, name="app-calendar-index"),
]

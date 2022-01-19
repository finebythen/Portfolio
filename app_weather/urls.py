from django.urls import path
from . import views

urlpatterns = [
    path('wetter/vorhersage/adr:<str:adr>/lat:<str:lat>/lon:<str:lon>/', views.result, name="app-weather-result"),
]
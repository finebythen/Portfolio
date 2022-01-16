from django.urls import path
from . import views

urlpatterns = [
    path('suche/', views.search, name="app-weather-search"),
    path('vorhersage/adr:<str:adr>/lat:<str:lat>/lon:<str:lon>/', views.result, name="app-weather-result"),
]
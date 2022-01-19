from django.urls import path
from . import views


urlpatterns = [
    # template
    path('', views.index, name="app-grocery-store-index"),
]
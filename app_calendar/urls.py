from django.urls import path
from . import api, views

urlpatterns = [
    # templates
    path('', views.app_calendar_index, name="app-calendar-index"),

    # api [GET]
    path('api/endpoints/', api.app_calendar_api_endpoints, name="app-calendar-api-endpoints"),
    path('api/get/appointments/', api.app_calendar_api_get_appointments, name="app-calendar-api-get-appointments"),

    # api [POST]
    path('api/post/appointment/', api.app_calendar_api_post_appointment, name="app-calendar-api-post-appointment"),
]

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Appointment
from .serializers import AppointmentSerializerGET, AppointmentSerializerPOST
from frontend.functions import get_user_name


@api_view(['GET'])
def app_calendar_api_endpoints(request):
    endpoints = {
        'list endpoints': 'app-calendar/api/endpoints',
    }
    return Response(endpoints)


@api_view(['GET'])
def app_calendar_api_get_appointments(request):
    qs = Appointment.objects.all()
    serializer = AppointmentSerializerGET(qs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def app_calendar_api_post_appointment(request):
    user_name = get_user_name(request)
    serializer = AppointmentSerializerPOST(data=request.data)
    if serializer.is_valid():
        serializer.save(created_user=user_name)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

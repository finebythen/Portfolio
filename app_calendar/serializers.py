from rest_framework.serializers import ModelSerializer
from .models import Appointment


class AppointmentSerializerGET(ModelSerializer):
    class Meta:
        model = Appointment
        exclude = [
            'created_user',
            'created_date',
            'updated_user',
            'updated_date',
        ]


class AppointmentSerializerPOST(ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            'name',
            'date',
            'time_from',
            'time_to',
            'description',
            'latitude',
            'longitude',
        ]

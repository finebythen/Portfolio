from django.db.models import fields
from rest_framework.serializers import ModelSerializer
from .models import Task


class TaskSerializerGET(ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'id',
            'description',
            'closed',
        ]


class TaskSerializerPOST(ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'description',
        ]

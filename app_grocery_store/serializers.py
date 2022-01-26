from rest_framework.serializers import ModelSerializer
from .models import Einkaufsliste


class EinkaufslisteSerializer_GET(ModelSerializer):
    class Meta:
        model = Einkaufsliste
        fields = '__all__'


class EinkaufslisteSerializer_POST(ModelSerializer):
    class Meta:
        model = Einkaufsliste
        fields = [
            'beschreibung',
        ]
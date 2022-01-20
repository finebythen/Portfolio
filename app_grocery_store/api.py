from importlib.util import resolve_name
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

from .models import Einkaufsliste
from .serializers import *
from frontend.functions import get_user_name


@api_view(['GET'])
def api_data_get_all(request):
    try:
        qs = Einkaufsliste.objects.all()
        serializer = EinkaufslisteSerializer_GET(qs, many=True)
        return Response(serializer.data)
    except ConnectionError:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def api_data_post(request):
    try:
        serializer = EinkaufslisteSerializer_POST(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
    except ConnectionError:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def api_data_put_add(request, pk):
    try:
        qs = Einkaufsliste.objects.get(id=pk)
        anzahl_vorher = qs.anzahl
        anzahl_nachher = anzahl_vorher + 1
        qs.anzahl = anzahl_nachher
        qs.save()
        return Response(status=status.HTTP_200_OK)
    except ConnectionError:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def api_data_put_remove(request, pk):
    try:
        qs = Einkaufsliste.objects.get(id=pk)
        anzahl_vorher = qs.anzahl
        anzahl_nachher = 0 if anzahl_vorher == 0 else anzahl_vorher - 1
        qs.anzahl = anzahl_nachher
        qs.save()
        return Response(status=status.HTTP_200_OK)
    except ConnectionError:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def api_data_put_check(request, pk):
    try:
        qs = Einkaufsliste.objects.get(id=pk)
        qs.erledigt = True if qs.erledigt == False else False
        qs.save()
        return Response(status=status.HTTP_200_OK)
    except ConnectionError:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def api_data_delete(request, pk):
    try:
        qs = Einkaufsliste.objects.get(id=pk)
        qs.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except ConnectionError:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
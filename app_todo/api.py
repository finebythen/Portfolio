from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializerGET, TaskSerializerPOST
from frontend.functions import get_user_name


@api_view(['GET'])
def app_todo_api_endpoints(request):
    endpoints = {
        'get all tasks': 'app-todo/api/get/tasks/',
    }
    return Response(endpoints)


@api_view(['GET'])
def app_todo_api_get_tasks(request):
    qs = Task.objects.all().order_by('closed', 'description')
    serializer = TaskSerializerGET(qs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def app_todo_api_post_task(request):
    user_name = get_user_name(request)
    serializer = TaskSerializerPOST(data=request.data)
    if serializer.is_valid():
        serializer.save(created_user=user_name)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def app_todo_api_put_task(request, pk):
    qs = Task.objects.get(id=pk)
    if qs.closed:
        qs.closed = False
        qs.save()
    else:
        qs.closed = True
        qs.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['DELETE'])
def app_todo_delete_task(request, pk):
    qs = Task.objects.get(id=pk)
    qs.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

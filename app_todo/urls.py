from django.urls import path
from . import api, views


urlpatterns = [
    # templates
    path('', views.index, name="app-todo-index"),

    # api [GET]
    path('api/endpoints/', api.app_todo_api_endpoints, name="app-todo-api-endpoints"),
    path('api/get/tasks/', api.app_todo_api_get_tasks, name="app-todo-api-get-tasks"),

    # api [POST]
    path('api/post/task/', api.app_todo_api_post_task, name="app-todo-api-post-task"),

    # api [PUT]
    path('api/put/task/<int:pk>/', api.app_todo_api_put_task, name="app-todo-api-put-task"),

    # api [DELETE]
    path('api/delete/task/<int:pk>/', api.app_todo_delete_task, name="app-todo-api-delete-task"),
]

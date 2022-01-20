from django.urls import path
from . import api, views


urlpatterns = [
    # template
    path('', views.index, name="app-grocery-store-index"),
    path('export-xls/', views.export_xls, name="app-grocery-store-export-xls"),

    # api
    path('api/get/', api.api_data_get_all, name="app-grovery-store-api-get-all"),
    path('api/post/', api.api_data_post, name="app-grovery-store-api-post"),
    path('api/put/<int:pk>/add/', api.api_data_put_add, name="app-grovery-store-api-put-add"),
    path('api/put/<int:pk>/remove/', api.api_data_put_remove, name="app-grovery-store-api-put-remove"),
    path('api/put/<int:pk>/check/', api.api_data_put_check, name="app-grovery-store-api-put-check"),
    path('api/delete/<int:pk>/', api.api_data_delete, name="app-grovery-store-api-delete"),
]
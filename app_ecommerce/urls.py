from django.urls import path
from . import views

urlpatterns = [
    path('store/', views.store, name="store"),
    path('cart/', views.cart, name="cart"),
    path('checkout/', views.checkout, name="checkout"),
    path('object/<int:pk>/', views.object, name="object"),

    path('update-item/', views.updateItem, name="update-item"),
    path('process-order/', views.processOrder, name="process-order"),
]
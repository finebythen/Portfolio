import datetime as dt
import json

from django.http import JsonResponse
from django.shortcuts import render

from .models import *
from .utils import cookieCart, guestOrder

TEMPLATE_URL = 'app_ecommerce'

# Create your views here.
def store(request):
    context = {}

    qs_products = Product.objects.all()
    context['products'] = qs_products

    if request.user.is_authenticated:
        try:
            customer = request.user.customer
            order, created = Order.objects.get_or_create(customer=customer, complete=False)
            items = order.orderitem_set.all()
            cardItems= order.get_cart_items
            context['items'], context['order'], context['cardItems'] = items, order, cardItems
        except:
            order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
            items = []
            cardItems = order['get_cart_items']
            context['items'] = items
            context['cardItems'] = cardItems
    else:
        cookieData = cookieCart(request)
        cardItems, order, items = cookieData['cardItems'], cookieData['order'], cookieData['items']
        context['items'], context['order'], context['cardItems'] = items, order, cardItems

    return render(request, f'{TEMPLATE_URL}/store.html', context)


def cart(request):
    context = {}

    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
        cardItems= order.get_cart_items
        context['items'], context['order'], context['cardItems'] = items, order, cardItems
    else:
        cookieData = cookieCart(request)
        cardItems, order, items = cookieData['cardItems'], cookieData['order'], cookieData['items']
        context['items'], context['order'], context['cardItems'] = items, order, cardItems

    return render(request, f'{TEMPLATE_URL}/cart.html', context)


def checkout(request):
    context = {}

    if request.user.is_authenticated:
        try:
            customer = request.user.customer
            order, created = Order.objects.get_or_create(customer=customer, complete=False)
            items = order.orderitem_set.all()
            cardItems= order.get_cart_items
            context['items'], context['order'], context['cardItems'] = items, order, cardItems
        except:
            order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
            items = []
            cardItems = order['get_cart_items']
            context['items'], context['order'], context['cardItems'] = items, order, cardItems
    else:
        cookieData = cookieCart(request)
        cardItems, order, items = cookieData['cardItems'], cookieData['order'], cookieData['items']
        context['items'], context['order'], context['cardItems'] = items, order, cardItems

    return render(request, f'{TEMPLATE_URL}/checkout.html', context)


def object(request, pk):
    qs = Product.objects.get(id=pk)
    return render(request, f'{TEMPLATE_URL}/object.html', {'obj': qs})


def updateItem(request):
    data = json.loads(request.body)
    productId = data['productId']
    action = data['action']

    customer = request.user.customer
    product = Product.objects.get(id=productId)
    order, created = Order.objects.get_or_create(customer=customer, complete=False)
    orderItem, created = OrderItem.objects.get_or_create(order=order, product=product)

    if action == 'add':
        orderItem.quantity = (orderItem.quantity + 1)
    elif action == 'remove':
        orderItem.quantity = (orderItem.quantity - 1)

    orderItem.save()

    if orderItem.quantity <= 0:
        orderItem.delete()

    return JsonResponse("Item was added!", safe=False)


def processOrder(request):
    transaction_id = dt.datetime.now().timestamp()
    data = json.loads(request.body)

    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
    else:
        customer, order = guestOrder(request, data)

    total = data['form']['total']
    total = float(total.replace(",", "."))
    order.transaction_id = transaction_id

    if total == order.get_cart_total:
        order.complete = True
    order.save()

    if order.shipping == True:
        ShippingAddress.objects.create(
            customer=customer,
            order=order,
            address=data['shipping']['address'],
            city=data['shipping']['city'],
            state=data['shipping']['state'],
            zipcode=data['shipping']['zipcode'],
        )

    return JsonResponse('Payment submitted', safe=False)
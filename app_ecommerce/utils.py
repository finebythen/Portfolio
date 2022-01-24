import json
from django.core.exceptions import ObjectDoesNotExist

from .models import *


def cookieCart(request):
    try:
        cart = json.loads(request.COOKIES['cart'])
    except KeyError:
        cart = {}
    order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
    items = []
    cardItems = order['get_cart_items']
    for i in cart:
        try:
            cardItems += cart[i]['quantity']
            product = Product.objects.get(id=i)
            total = (product.price * cart[i]['quantity'])

            order['get_cart_total'] += total
            order['get_cart_items'] += cart[i]['quantity']

            item = {
                'product': {
                    'id': product.id,
                    'name': product.name,
                    'price': product.price,
                    'imageURL': product.imageURL
                },
                'quantity': cart[i]['quantity'],
                'get_total': total,
            }
            items.append(item)

            if product.digital == False:
                order['shipping'] = True
        except ObjectDoesNotExist:
            pass

    return {'cardItems': cardItems, 'order': order, 'items': items}


def guestOrder(request, data):
    name = data['form']['name']
    email = data['form']['email']

    cookieData = cookieCart(request)
    items = cookieData['items']

    # create customer and check with (?) existing mail-address
    customer, created = Customer.objects.get_or_create(email=email)
    customer.name = name
    customer.save()

    # create order
    order = Order.objects.create(
        customer=customer,
        complete=False
    )

    for item in items:
        product = Product.objects.get(id=item['product']['id'])
        orderItem = OrderItem.objects.create(
            product=product,
            order=order,
            quantity=item['quantity']
        )
    return customer, order
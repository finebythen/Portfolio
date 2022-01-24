"use strict"

document.addEventListener("DOMContentLoaded", () => {
    let updateBtns = document.getElementsByClassName('update-cart');
    let url_app = 'app-ecommerce/';

    for (let i=0; i < updateBtns.length; i++) {
        updateBtns[i].addEventListener('click', e => {
            e.preventDefault();

            // variables
            let productId = updateBtns[i].dataset.product;
            let action = updateBtns[i].dataset.action;

            // functions
            const updateUserOrder = (productId, action) => {
                let url = `${url_base}${url_app}update-item/`;
                let csrftoken = getCookie('csrftoken');

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    },
                    body: JSON.stringify({
                        'productId': productId,
                        'action': action
                    })
                })
                .then(response => response.json())
                .then(function(data) {
                    location.reload();
                })
                .catch(error => {console.log(error)})
            };

            const addWebCookieItem = (productId, action) => {
                // add, remove items as not logged in user
                if (action == 'add') {
                    cart[productId] == undefined ? cart[productId] = {'quantity': 1} : cart[productId]['quantity'] += 1;
                };

                if (action == 'remove') {
                    cart[productId]['quantity'] -= 1;

                    if (cart[productId]['quantity'] <= 0) {
                        console.log("Item should be deleted");
                        delete cart[productId];
                    };
                };

                console.log('Cart:', cart);
                document.cookie = 'cart=' + JSON.stringify(cart) + ';domain=;path=/';
                location.reload();
            };

            user == 'AnonymousUser' ? addWebCookieItem(productId, action) : updateUserOrder(productId, action);
        })
    };
});
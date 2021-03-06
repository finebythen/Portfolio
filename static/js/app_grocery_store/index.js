"use strict"

document.addEventListener("DOMContentLoaded", e => {
    const url_app = 'app-grocery-store/';
    let form = document.getElementById('form-store');
    let input = document.getElementById('input-store');
    let btn_post = document.getElementById('btn-post-store');
    let ul = document.getElementById('ulist-store');

    const api_get_store_all = () => {
        let url = `${url_base}${url_app}api/get/`;

        while (ul.hasChildNodes()) {
            ul.removeChild(ul.firstChild);
        };

        fetch(url)
        .then(response => response.json())
        .then(function(data) {
            let list = data;
            let fragment = document.createDocumentFragment();

            for (let i=0; i < list.length; i++) {
                let li = document.createElement('li');
                let div = document.createElement('div');
                let p_text = document.createElement('p');
                let p_amount = document.createElement('p');
                let btn_add = document.createElement('button');
                let btn_remove = document.createElement('button');
                let btn_delete = document.createElement('button');
                let btn_delete_sign = document.createElement('i');

                p_text.innerText = list[i].beschreibung;
                p_text.setAttribute('class', 'p-text');
                p_text.setAttribute('id', `p-text-${list[i].id}`);
                p_text.style.cursor = 'pointer';
                list[i].erledigt ? p_text.style.textDecoration = 'line-through' : p_text.style.textDecoration = 'none';

                p_amount.innerText = `Anzahl: ${list[i].anzahl}`;

                div.setAttribute('class', 'container-buttons');
                btn_add.innerText = '+';
                btn_add.setAttribute('class', 'btn btn-warning btn-sm btn-add');
                btn_add.setAttribute('id', `btn-add-${list[i].id}`);
                btn_remove.innerText = '-';
                btn_remove.setAttribute('class', 'btn btn-warning btn-sm btn-remove');
                btn_remove.setAttribute('id', `btn-remove-${list[i].id}`);
                btn_delete_sign.setAttribute('class', 'bi bi-trash');
                btn_delete.appendChild(btn_delete_sign);
                btn_delete.setAttribute('class', 'btn btn-danger btn-sm btn-delete');
                btn_delete.setAttribute('id', `btn-delete-${list[i].id}`);

                p_text.addEventListener('click', e => {
                    e.preventDefault();
                    api_put_check(list[i].id);
                });
                btn_remove.addEventListener('click', e => {
                    e.preventDefault();
                    api_put_remove(list[i].id);
                });
                btn_add.addEventListener('click', e => {
                    e.preventDefault();
                    api_put_add(list[i].id);
                });
                btn_delete.addEventListener('click', e => {
                    e.preventDefault();
                    api_delete_store(list[i].id);
                });

                div.appendChild(btn_remove);
                div.appendChild(btn_add);
                div.appendChild(btn_delete);

                li.setAttribute('data-list-id', list[i].id);
                li.appendChild(p_text);
                li.appendChild(p_amount);
                li.appendChild(div);

                fragment.append(li);
            };
            ul.append(fragment);
        })
        .catch(error => {console.log(error)})
    };

    const api_get_store_single = pk => {
        let url = `${url_base}${url_app}api/get/${pk}/`;
        let li = document.getElementsByTagName('li');

        fetch(url)
        .then(response => response.json())
        .then(data => {
            let obj = data;
            let search_id = String(obj.id);

            for (let item of li) {
                if (item.dataset.listId === search_id) {
                    item.childNodes[0].innerText = obj.beschreibung;
                    item.childNodes[1].innerText = `Anzahl: ${obj.anzahl}`;
                    break;
                };
            };
        })
        .catch(error => {console.log(error)})
    };

    const api_post_store = () => {
        let url = `${url_base}${url_app}api/post/`;
        let csrftoken = getCookie('csrftoken');

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                'beschreibung': input.value
            })
        })
        .then(response => response.json())
        .then(data => {console.log(data)})
        .then(function() {
            api_get_store_all();
            form.reset();
        })
        .catch(error => {console.log(error)})
    };

    const api_put_add = pk => {
        let url = `${url_base}${url_app}api/put/${pk}/add/`;
        let csrftoken = getCookie('csrftoken');

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        })
        .then(data => {console.log(data)})
        .then(function() {
            api_get_store_single(pk);
        })
        .catch(error => {console.log(error)})
    };

    const api_put_remove = pk => {
        let url = `${url_base}${url_app}api/put/${pk}/remove/`;
        let csrftoken = getCookie('csrftoken');

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        })
        .then(data => {console.log(data)})
        .then(function() {
            api_get_store_single(pk);
        })
        .catch(error => {console.log(error)})
    };

    const api_put_check = pk => {
        let url = `${url_base}${url_app}api/put/${pk}/check/`;
        let csrftoken = getCookie('csrftoken');

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        })
        .then(data => {console.log(data)})
        .then(function() {
            api_get_store_all();
        })
        .catch(error => {console.log(error)})
    };

    const api_delete_store = pk => {
        let url = `${url_base}${url_app}api/delete/${pk}/`;
        let csrftoken = getCookie('csrftoken');

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        })
        .then(data => {console.log(data)})
        .then(function() {
            api_get_store_all();
        })
        .catch(error => {console.log(error)})
    };

    const getCookie = name => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    // init functions
    api_get_store_all();

    // init listeners
    btn_post.addEventListener('click', e => {
        e.preventDefault();
        api_post_store();
    })
})
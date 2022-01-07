"use strict"

document.addEventListener("DOMContentLoaded", e => {
    const form = document.getElementById("form-todo");
    const input = document.getElementById("input-todo-task");
    const btn_post = document.getElementById("btn-post-task");
    const ul = document.getElementById('ulist-todo');

    const get_tasks = () => {
        let url = `${url_base}app-todo/api/get/tasks/`;

        fetch(url)
        .then(response => response.json())
        .then(function(data) {
            let list = data;
            let fragment = document.createDocumentFragment();

            while (ul.hasChildNodes()) {
                ul.removeChild(ul.firstChild);
            };

            for (let i=0; i < list.length; i++) {
                let li = document.createElement('li');
                let p = document.createElement('p');
                let btn = document.createElement('button');

                p.textContent = list[i].description;
                p.setAttribute('class', 'p-update-task');
                p.style.cursor = 'pointer';
                list[i].closed ? p.style.textDecoration = 'line-through' : p.style.textDecoration = 'none';
                btn.setAttribute('class', 'btn btn-danger btn-sm btn-delete-task');
                btn.setAttribute('id', `btn-delete-task-${list[i].id}`);
                btn.setAttribute('value', list[i].id);
                btn.setAttribute('type', 'button');
                btn.textContent = '-';

                li.appendChild(p);
                li.appendChild(btn);

                fragment.append(li);
            };
            ul.append(fragment);

            // add listener to delete-buttons
            for(let i in list) {
                let p_update = document.getElementsByClassName('p-update-task')[i];
                let btn_delete = document.getElementsByClassName('btn-delete-task')[i];

                p_update.addEventListener('click', e => {
                    e.preventDefault();
                    put_task(parseInt(list[i].id));
                })

                btn_delete.addEventListener('click', e => {
                    e.preventDefault();
                    delete_task(parseInt(btn_delete.value));
                });
            };
        })
        .catch((error) => {console.log('Error: ', error)})
    };

    const post_task = () => {
        let url = `${url_base}app-todo/api/post/task/`;
        let csrftoken = getCookie('csrftoken');

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                'description': input.value
            })
        })
        .then(response => response.json())
        .then(data => {console.log('Success: ', data)})
        .then(function() {
            form.reset();
            get_tasks();
        })
        .catch((error) => {console.log('Error: ', error)})
    };

    const put_task = pk => {
        let url = `${url_base}app-todo/api/put/task/${pk}/`;
        let csrftoken = getCookie('csrftoken');

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        })
        .then(data => {console.log('Success: ', data)})
        .then(function() {
            get_tasks();
        })
        .catch((error) => {console.log('Error: ', error)})
    };

    const delete_task = pk => {
        let url = `${url_base}app-todo/api/delete/task/${pk}/`;
        let csrftoken = getCookie('csrftoken');

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        })
        .then(data => {console.log('Deleted: ', data)})
        .then(function() {
            get_tasks();
        })
        .catch((error) => {console.log('Error: ', error)})
    };

    // init functions
    get_tasks();

    // init listeners
    btn_post.addEventListener('click', e => {
        e.preventDefault();
        post_task();
    })

});

"use strict"

document.addEventListener("DOMContentLoaded", e => {
    const form = document.getElementById('form-calendar');
    const ul = document.getElementById('ulist-calendar');
    const name = document.getElementById('input-name');
    const date = document.getElementById('input-date');
    const time_start = document.getElementById('input-time-from');
    const time_end = document.getElementById('input-time-to');
    const description = document.getElementById('textarea-description');
    let latitude = null;
    let longitude = null;

    // add map, starting coordinates, zoom-level and marker to template
    let myMap = L.map('map').setView([54.793743, 9.446996], 10);
    let layerGroup = L.layerGroup().addTo(myMap);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(myMap);

    myMap.on('click', e => {
        let coordLat = e.latlng.lat;
        let coordLng = e.latlng.lng;
        layerGroup.clearLayers();
        L.marker([coordLat, coordLng]).addTo(layerGroup);
        latitude = coordLat;
        longitude = coordLng;
    });

    const get_appointments = () => {
        let url = `${url_base}app-calendar/api/get/appointments/`;

        fetch(url)
        .then(response => response.json())
        .then(function(data) {
            let list = data;
            let fragment = document.createDocumentFragment();
            console.log(list);

            for (let i=0; i < list.length; i++) {
                let li = document.createElement('li');
                let p_name = document.createElement('p');
                let p_date_time = document.createElement('p');
                let btn_container = document.createElement('div');
                let btn_edit = document.createElement('button');
                let btn_delete = document.createElement('button');
                let mapCanvas = document.createElement('div');

                p_name.textContent = list[i].name;
                p_name.setAttribute('class', 'p-appointment-name');
                p_date_time.textContent = `am ${list[i].date}, von ${list[i].time_from} bis ${list[i].time_to}`;

                btn_edit.textContent = 'Edit';
                btn_edit.setAttribute('class', 'btn btn-outline-primary btn-sm btn-edit-appointment');
                btn_edit.setAttribute('id', `btn-edit-appointment-${list[i].id}`);
                btn_edit.setAttribute('value', list[i].id);
                btn_edit.setAttribute('type', 'button');

                btn_delete.textContent = '-';
                btn_delete.setAttribute('class', 'btn btn-outline-danger btn-sm btn-delete-appointment');
                btn_delete.setAttribute('id', `btn-delete-appointment-${list[i].id}`);
                btn_delete.setAttribute('value', list[i].id);
                btn_delete.setAttribute('type', 'button');

                btn_container.setAttribute('class', 'li-btn-container');
                btn_container.appendChild(btn_edit);
                btn_container.appendChild(btn_delete);

                mapCanvas.setAttribute('class', 'map-canvas');
                mapCanvas.setAttribute('id', `myMap-${list[i].id}`);

                li.appendChild(p_name);
                li.appendChild(p_date_time);
                li.appendChild(btn_container);
                li.appendChild(mapCanvas);

                fragment.append(li);
            };
            ul.append(fragment);
        })
        .catch((error) => {console.log('Error: ', error)})
    };

    const post_appointment = () => {
        let url = `${url_base}app-calendar/api/post/appointment/`;
        let csrftoken = getCookie('csrftoken');

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                // Do something
            })
        })
        .then(response => response.json())
        .then(data => {console.log('Success: ', data)})
        .then(function() {
            // Do something
        })
        .catch((error) => {console.log('Error: ', error)})
    };

    // init functions
    get_appointments();

    // init listeners
    description.addEventListener('keyup', e => {
        e.preventDefault();
        let value_chars = 250 - description.textLength;
        document.getElementById('p-description-counter').textContent = `verbleibende Zeichen: ${value_chars}`;
    });
});

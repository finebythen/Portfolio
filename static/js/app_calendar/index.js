"use strict"

document.addEventListener("DOMContentLoaded", e => {
    const form = document.getElementById('form-calendar');
    const card_calendar = document.getElementById('calendar-list-body');
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

            while (card_calendar.hasChildNodes()) {
                card_calendar.removeChild(card_calendar.firstChild);
            };

            for (let i=0; i < list.length; i++) {
                let div_card = document.createElement('div');
                let div_card_header = document.createElement('div');
                let div_card_body = document.createElement('div');
                let div_description = document.createElement('div');
                let div_map = document.createElement('div');
                
                let hsix = document.createElement('h6');
                let header_icon = document.createElement('i');
                let p_date = document.createElement('p');
                let p_time = document.createElement('p');
                let p_description_header = document.createElement('p');
                let p_description = document.createElement('p');

                div_card.setAttribute('class', 'card');

                // header
                hsix.textContent = list[i].name;
                hsix.setAttribute('id', 'calendar-entry-text');
                hsix.setAttribute('id', `calendar-entry-${list[i].id}`);
                hsix.setAttribute('value', list[i].id);
                header_icon.setAttribute('class', 'bi bi-trash');
                header_icon.style.cursor = 'pointer';
                div_card_header.setAttribute('class', 'card-header');
                div_card_header.appendChild(hsix);
                div_card_header.appendChild(header_icon);

                // body
                p_date.textContent = `Datum: ${list[i].date}`;
                p_time.textContent = `Zeit: ${list[i].time_from} - ${list[i].time_to}`;
                p_description_header.textContent = 'Details:';
                p_description_header.setAttribute('class', 'p-description-head');
                p_description.textContent = list[i].description;
                div_description.appendChild(p_description_header);
                div_description.appendChild(p_description);

                div_map.setAttribute('class', 'mapDiv');
                div_map.setAttribute('id', `calendarMap-${list[i].id}`);

                div_card_body.setAttribute('class', 'card-body');
                div_card_body.appendChild(p_date);
                div_card_body.appendChild(p_time);
                div_card_body.appendChild(div_description);
                div_card_body.appendChild(div_map);

                // card
                div_card.appendChild(div_card_header);
                div_card.appendChild(div_card_body);
                fragment.append(div_card);
            };
            card_calendar.append(fragment);

            // add data to map
            for (let i=0; i < list.length; i++) {
                let calendarMap = L.map(`calendarMap-${list[i].id}`).setView([list[i].latitude, list[i].longitude], 16);
                L.marker([list[i].latitude, list[i].longitude]).addTo(calendarMap);
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(calendarMap);
            };

            // add event listeners
            for (let i in list) {
                let header_text = document.getElementsByClassName('calendar-entry-text')[i];
                let icon_delete = document.getElementsByClassName('bi-trash')[i];

                icon_delete.addEventListener('click', e => {
                    e.preventDefault();
                    delete_appointment(parseInt(list[i].id));
                });
            };
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

    const delete_appointment = pk => {
        let url = `${url_base}app-calendar/api/delete/appointment/${pk}/`;
        let csrftoken = getCookie('csrftoken');

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        })
        .then(data => {console.log('Delete: ', data)})
        .then(function() {
            get_appointments();
        })
        .catch((error) => {console.log('Error: ', error)})
    };

    // init functions
    get_appointments();

    // init listeners
    description.addEventListener('keyup', e => {
        e.preventDefault();
        let value_chars = 100 - description.textLength;
        document.getElementById('p-description-counter').textContent = `verbleibende Zeichen: ${value_chars}`;
    });
});

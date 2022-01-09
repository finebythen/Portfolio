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
            let div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');
            console.log(list);

            for (let i=0; i < list.length; i++) {
                let div_card_header = document.createElement('div');
                let div_card_body = document.createElement('div');
                let div_card_footer = document.createElement('div');
                let div_description = document.createElement('div');
                let div_collapse = document.createElement('div');
                let div_map_container = document.createElement('div');
                let div_map = document.createElement('div');
                
                let hsix = document.createElement('h6');
                let p_date = document.createElement('p');
                let p_time = document.createElement('p');
                let p_description = document.createElement('p');
                
                let btn_map = document.createElement('button');
                let btn_edit = document.createElement('button');
                let btn_delete = document.createElement('button');
                let map_icon = document.createElement('i');

                // header
                hsix.textContent = list[i].name;
                hsix.setAttribute('id', `calendar-entry-${list[i].id}`);
                hsix.setAttribute('value', list[i].id);
                div_card_header.setAttribute('class', 'card-header calendar-header');
                div_card_header.appendChild(hsix);

                // body
                p_date.textContent = list[i].date;
                p_time.textContent = `${list[i].time_from} - ${list[i].time_to}`;
                p_description.textContent = list[i].description;
                div_description.appendChild(p_description);

                map_icon.setAttribute('class', 'bi bi-geo-alt');
                btn_map.appendChild(map_icon);
                btn_map.setAttribute('class', 'btn btn-info btn-sm');
                btn_map.setAttribute('type', 'button');
                btn_map.setAttribute('data-bs-toggle', 'collapse');
                btn_map.setAttribute('data-bs-target', `#collapseMap-${list[i].id}`);
                btn_map.setAttribute('aria-expanded', 'false');
                btn_map.setAttribute('aria-controls', `collapseMap-${list[i].id}`);

                div_collapse.setAttribute('class', 'collapse');
                div_collapse.setAttribute('id', `collapseMap-${list[i].id}`);
                div_map_container.setAttribute('class', 'card card-body');
                div_map.setAttribute('id', `calendarMap-${list[i].id}`);

                // add data to map
                // let calendarMap = L.map(`calendarMap-${list[i].id}`).setView([list[i].latitude, list[i].longitude], 10);
                // L.marker([list[i].latitude, list[i].longitude]).addTo(calendarMap);
                // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(calendarMap);

                div_map_container.appendChild(div_map);
                div_collapse.appendChild(div_map_container);

                div_card_body.setAttribute('class', 'card-body calendar-body');
                div_card_body.appendChild(p_date);
                div_card_body.appendChild(p_time);
                div_card_body.appendChild(div_description);
                div_card_body.appendChild(btn_map);
                div_card_body.appendChild(div_collapse);

                // footer
                btn_edit.setAttribute('class', 'btn btn-outline-primary btn-sm btn-edit-calendar');
                btn_edit.setAttribute('id', `btn-edit-calendar-${list[i].id}`);
                btn_edit.setAttribute('value', list[i].id);
                btn_edit.setAttribute('type', 'button');
                btn_edit.textContent = 'Edit';
                btn_delete.setAttribute('class', 'btn btn-outline-danger btn-sm btn-delete-calendar');
                btn_delete.setAttribute('id', `btn-delete-calendar-${list[i].id}`);
                btn_delete.setAttribute('value', list[i].id);
                btn_delete.setAttribute('type', 'button');
                btn_delete.textContent = '-';

                div_card_footer.setAttribute('class', 'card-footer calendar-footer');
                div_card_footer.appendChild(btn_edit);
                div_card_footer.appendChild(btn_delete);

                // card
                div_card.appendChild(div_card_header);
                div_card.appendChild(div_card_body);
                div_card.appendChild(div_card_footer);
                fragment.append(div_card);
            };
            card_calendar.append(fragment);
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

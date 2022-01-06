"use strict"

document.addEventListener("DOMContentLoaded", e => {

    let map_geburtstag = L.map('map-geburtstag').setView([54.685365, 8.564311], 16);
    let map_grundschule = L.map('map-grundschule').setView([54.689599, 8.567505], 16);
    let map_isd = L.map('map-isd').setView([51.292010, 6.735910], 16);
    let map_gesamtschule_foehr = L.map('map-gs-foehr').setView([54.692000, 8.556522], 16);
    let map_gesamtschule_flensburg = L.map('map-gs-flensburg').setView([54.786602, 9.469135], 16);
    let map_pi_1 = L.map('map-pi-1').setView([54.792065, 9.439322], 16);
    let map_pi_2 = L.map('map-pi-2').setView([54.792065, 9.439322], 16);
    let map_pk = L.map('map-pk').setView([54.797069, 9.428644], 16);
    let map_nkn_1 = L.map('map-nkn-1').setView([54.758760, 9.415710], 16);
    let map_nkn_2 = L.map('map-nkn-2').setView([54.758760, 9.415710], 16);
    let map_nkn_3 = L.map('map-nkn-3').setView([54.758760, 9.415710], 16);
    let map_nkn_4 = L.map('map-nkn-4').setView([54.758760, 9.415710], 16);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(map_geburtstag);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(map_grundschule);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(map_isd);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(map_gesamtschule_foehr);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(map_gesamtschule_flensburg);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(map_pi_1);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(map_pi_2);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(map_pk);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(map_nkn_1);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(map_nkn_2);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(map_nkn_3);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(map_nkn_4);

    L.marker([54.685365, 8.564311]).addTo(map_geburtstag);
    L.marker([54.689599, 8.567505]).addTo(map_grundschule);
    L.marker([51.292010, 6.735910]).addTo(map_isd);
    L.marker([54.692000, 8.556522]).addTo(map_gesamtschule_foehr);
    L.marker([54.786602, 9.469135]).addTo(map_gesamtschule_flensburg);
    L.marker([54.792065, 9.439322]).addTo(map_pi_1);
    L.marker([54.792065, 9.439322]).addTo(map_pi_2);
    L.marker([54.797069, 9.428644]).addTo(map_pk);
    L.marker([54.758760, 9.415710]).addTo(map_nkn_1);
    L.marker([54.758760, 9.415710]).addTo(map_nkn_2);
    L.marker([54.758760, 9.415710]).addTo(map_nkn_3);
    L.marker([54.758760, 9.415710]).addTo(map_nkn_4);

    const reveal = () => {
        let reveals = document.querySelectorAll(".reveal");

        for (let i=0; i < reveals.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = reveals[i].getBoundingClientRect().top;
            let elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
            };
        };
    };

    window.addEventListener("scroll", reveal);
});

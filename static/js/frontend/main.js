"use strict"

document.addEventListener("DOMContentLoaded", () => {
    // variables
    const icon_scroll = document.getElementById('icon-scroll');

    // init listeners
    icon_scroll.addEventListener('click', e => {
        e.preventDefault();
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
});
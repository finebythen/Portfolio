"use strict"

document.addEventListener("DOMContentLoaded", () => {

    const imageZoom = (imgId, lensId) => {
        let img = document.getElementById(imgId);
        let lens = document.getElementById(lensId);
        let zoomRatio = 2;

        lens.style.backgroundImage = `url(${img.src})`;
        lens.style.backgroundSize = `${(img.width * zoomRatio)}px ${(img.height * zoomRatio)}px`;
        lens.style.display = 'none';

        img.addEventListener('mousemove', e => {
            e.preventDefault();
            lens.style.display = 'block';
            moveLens();
        });

        lens.addEventListener('mousemove', e => {
            e.preventDefault();
            moveLens();
        });

        const getCursor = () => {
            let e = window.event;
            let bounds = img.getBoundingClientRect();

            let x = e.pageX - bounds.left;
            let y = e.pageY - bounds.top;

            x = x - window.pageXOffset;
            y = y - window.pageYOffset;

            return {'x': x, 'y': y};
        };

        const moveLens = () => {
            let pos = getCursor();

            let positionLeft = pos.x - (lens.offsetWidth / 2);
            let positionTop = pos.y - (lens.offsetHeight / 2);

            if (positionLeft < 0) {
                positionLeft = 0;
            };
            
            if (positionTop < 0) {
                positionTop = 0;
            };

            if (positionLeft > img.width - lens.offsetWidth / zoomRatio) {
                positionLeft = img.width - lens.offsetWidth / zoomRatio;
            };

            if (positionTop > img.height - lens.offsetHeight / zoomRatio) {
                positionTop = img.height - lens.offsetHeight / zoomRatio;
            };

            lens.style.left = `${positionLeft}px`;
            lens.style.top = `${positionTop}px`;

            lens.style.backgroundPosition = `-${(pos.x * zoomRatio)}px -${(pos.y * zoomRatio)}px`;
        };
    };

    imageZoom('featured', 'lens');
});
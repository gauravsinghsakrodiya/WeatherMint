import {
    locationBtn,
    page2
} from "../dom.js";

import {
    getWeatherByCoords
} from "../api/weather-api.js";

export function initLocationEvents() {

    locationBtn.addEventListener("click", async () => {

         navigator.geolocation.getCurrentPosition(

            (position) => {

                const lat =
                    position.coords.latitude;

                const lon =
                    position.coords.longitude;

                 getWeatherByCoords(lat, lon);

                page2.scrollIntoView({
                    behavior: "smooth"
                });
            },

            (error) => {

                alert("Location Access Denied");

                console.log(error);
            }
        );
    });
}
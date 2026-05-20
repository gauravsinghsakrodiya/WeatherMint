
import { weatherLine } from "../dom.js";

import { getTemperatureLine }
    from "../utils/temperature-lines.js";

export function renderWeather(data) {

    const temp = data.main.temp;

    document.querySelector(".temp").innerText =
        `${Math.round(temp)}°C`;

    document.querySelector(".temp-city").innerText =
        data.name;

    weatherLine.innerText =
        getTemperatureLine(temp);

    document.querySelector(".high-temp").innerText =
        `${Math.round(data.main.temp_max)}°`;

    document.querySelector(".low-temp").innerText =
        `${Math.round(data.main.temp_min)}°`;

    document.querySelector(".humidity").innerText =
        `${data.main.humidity}%`;

    document.querySelector(".wind-speed").innerText =
        `${data.wind.speed} km/h`;

    document.querySelector(".feels-like").innerText =
        `${Math.round(data.main.feels_like)}°`;

    document.querySelector(".pressure").innerText =
        `${data.main.pressure} hPa`;
}
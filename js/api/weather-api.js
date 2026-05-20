import { apiKey }
    from "../config/config.js";

import { renderWeather }
    from "../ui/render.weather.js";

export async function getWeather(city) {

    const apiURL =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(apiURL);

    const data = await response.json();

    console.log(data);

    renderWeather(data);

    document.body.classList.remove("lock-scroll");
}

export async function getWeatherByCoords(lat, lon) {

    const apiURL =
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    const response = await fetch(apiURL);

    const data = await response.json();

    console.log(data);

    renderWeather(data);

    document.body.classList.remove("lock-scroll");
}
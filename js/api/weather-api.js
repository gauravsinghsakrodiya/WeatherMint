import { apiKey }
    from "../config/config.js";

import { renderWeather }
    from "../ui/render.weather.js";

const noResult =
    document.querySelector(".no-result");

export async function getWeather(city) {

    try {

        // Prevent empty searches
        if (!city || city.trim() === "") {

            noResult.style.display = "block";
            noResult.textContent = "Please enter a city name";

            return;
        }

        const apiURL =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        const response = await fetch(apiURL);

        const data = await response.json();

        console.log(data);

        // Check invalid city or API failure
        if (data.cod !== 200 || !data.main) {

            noResult.style.display = "block";
            noResult.textContent = "City not found. Try another location.";

            return;
        }

        // Hide error if valid
        noResult.style.display = "none";

        renderWeather(data);

        document.body.classList.remove("lock-scroll");

    } catch (error) {

        console.error("Weather Fetch Error:", error);

        noResult.style.display = "block";
        noResult.textContent = "Something went wrong. Please try again.";
    }
}

export async function getWeatherByCoords(lat, lon) {

    try {

        const apiURL =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        const response = await fetch(apiURL);

        const data = await response.json();

        console.log(data);

        // Validate location weather response
        if (data.cod !== 200 || !data.main) {

            noResult.style.display = "block";
            noResult.textContent = "Unable to fetch location weather.";

            return;
        }

        noResult.style.display = "none";

        renderWeather(data);

        document.body.classList.remove("lock-scroll");

    } catch (error) {

        console.error("Location Weather Error:", error);

        noResult.style.display = "block";
        noResult.textContent = "Location weather failed.";
    }
}
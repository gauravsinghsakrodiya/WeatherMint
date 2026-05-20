
import {
    searchBar,
    page2,
    icon
} from "../dom.js";

import {
    selectedCity,
    setSelectedCity
} from "../state/search-state.js";

import {
    getCitySuggestions
} from "../api/location-api.js";

import {
    getWeather
} from "../api/weather-api.js";

export function initSearchEvents() {

    searchBar.addEventListener("input", () => {

        setSelectedCity(false);

        getCitySuggestions(searchBar.value);
    });

    searchBar.addEventListener("keydown", async (e) => {

        if (e.key === "Enter" && selectedCity) {

            await getWeather(searchBar.value);

            page2.scrollIntoView({
                behavior: "smooth"
            });
        }
    });

    icon.addEventListener("click", async () => {

        if (selectedCity) {

            await getWeather(searchBar.value);

            page2.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}
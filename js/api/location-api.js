import { apiKey }
    from "../config/config.js";

import {
    loaderBox,
    noResult,
    suggestions
} from "../dom.js";

import { renderSuggestions }
    from "../ui/render.suggestions.js";

export async function getCitySuggestions(query) {

    document.querySelector(".spinner").style.display =
        "inline-block";

    loaderBox.style.display = "flex";

    noResult.style.display = "none";

    suggestions.style.display = "none";

    if (query.trim().length < 3) {

        suggestions.innerHTML = "";

        suggestions.style.display = "none";

        loaderBox.style.display = "none";

        noResult.style.display = "none";

        return;
    }

    const url =
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

    const response = await fetch(url);

    const data = await response.json();

    if (data.length === 0) {

        suggestions.style.display = "none";

        setTimeout(() => {

            loaderBox.style.display = "flex";

            document.querySelector(".spinner").style.display =
                "none";

            noResult.style.display = "block";

        }, 600);

        return;
    }

    loaderBox.style.display = "none";

    suggestions.style.display = "block";

    renderSuggestions(data);
}
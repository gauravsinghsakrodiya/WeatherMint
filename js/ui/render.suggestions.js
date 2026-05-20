

import {
    suggestions,
    searchBar
} from "../dom.js";

import {
    setSelectedCity
} from "../state/search-state.js";

export function renderSuggestions(data) {

    suggestions.innerHTML = "";

    data.forEach(city => {

        const div =
            document.createElement("div");

        div.classList.add("suggestion-item");

        const cityText =
            `${city.name}, ${city.state || ""}, ${city.country}`;

        div.innerText = cityText;

        div.addEventListener("click", () => {

            searchBar.value = cityText;

            suggestions.innerHTML = "";

            suggestions.style.display = "none";

            setSelectedCity(true);
        });

        suggestions.appendChild(div);
    });
}
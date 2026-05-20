document.body.classList.add("lock-scroll");
const video = document.querySelector(".bg-video");
const weatherLine = document.querySelector(".weather-line");
const searchBar = document.querySelector(".search-bar");
const suggestions = document.querySelector(".suggestions");
const page2 = document.getElementById("page2");
const icon = document.getElementById("icon")
let selectedCity = false;
const loaderBox = document.querySelector(".loader-box");
const noResult = document.querySelector(".no-result");
const locationBtn = document.getElementById("location-btn");

const apiKey = "6e0d6cde294b99b7dc690960027e105e";

/* TEMPERATURE LINES */
function getTemperatureLine(temp) {

    if (temp <= -50) {
        return "Extreme survival conditions.";
    }

    else if (temp <= 0) {
        return "Freezing temperatures detected.";
    }

    else if (temp <= 20) {
        return "Cool atmospheric conditions.";
    }

    else if (temp <= 35) {
        return "Balanced and pleasant weather conditions.";
    }

    else if (temp <= 45) {
        return "Higher than average global temperatures detected.";
    }

    else {
        return "Extreme heat conditions detected.";
    }
}

/* WEATHER API */
async function getWeather(city) {

    const apiURL =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(apiURL);

    const data = await response.json();

    console.log(data);

    const temp = data.main.temp;

    document.querySelector(".temp").innerText =
        `${Math.round(temp)}°C`;

        document.querySelector(".temp-city").innerText = data.name;
    weatherLine.innerText =
        getTemperatureLine(temp);


    document.querySelector(".high-temp").innerText = `${Math.round(data.main.temp_max)}°`;
    document.querySelector(".low-temp").innerText = `${Math.round(data.main.temp_min)}°`;
    document.querySelector(".humidity").innerText = `${data.main.humidity}%`;   
    document.querySelector(".wind-speed").innerText = `${data.wind.speed} km/h`;
    document.querySelector(".feels-like").innerText = `${Math.round(data.main.feels_like)}°`;
    document.querySelector(".pressure").innerText =`${data.main.pressure} hPa`;
    document.body.classList.remove("lock-scroll");

/* SEARCH */
// searchBar.addEventListener("keydown", (e) => {

//     if (e.key === "Enter") {

//         getWeather(searchBar.value);

//     }
// });
}
async function getWeatherByCoords(lat, lon) {

    const apiURL =
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    const response = await fetch(apiURL);

    const data = await response.json();

    console.log(data);

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

    document.body.classList.remove("lock-scroll");
}
// Suggestions
/* SEARCH SUGGESTIONS */
async function getCitySuggestions(query) {

    document.querySelector(".spinner").style.display = "inline-block";
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

    suggestions.innerHTML = "";

    /* NO RESULTS */
    if (data.length === 0) {

        suggestions.style.display = "none";

        setTimeout(() => {

            loaderBox.style.display = "flex";
            document.querySelector(".spinner").style.display = "none";
            noResult.style.display = "block";

        }, 600);

        return;
    }

    /* SHOW BOX */
    loaderBox.style.display = "none";
    suggestions.style.display = "block";

    data.forEach(city => {

        const div =
            document.createElement("div");

        div.classList.add("suggestion-item");

        const cityText =
            `${city.name}, ${city.state || ""}, ${city.country}`;

        div.innerText = cityText;

        // div.addEventListener("mouseenter", () => {

        //     searchBar.value = cityText;

        // });

        div.addEventListener("click", () => {

            searchBar.value = cityText;

            suggestions.innerHTML = "";

            suggestions.style.display = "none";
            
            selectedCity = true;    

        });

        suggestions.appendChild(div);

    });
}

/* INPUT EVENT */
searchBar.addEventListener("input", () => {

    selectedCity = false;
    getCitySuggestions(searchBar.value);

});

/* VIDEO SPEED */
video.addEventListener("loadeddata", () => {
    video.playbackRate = 1.5;
});

var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.isDeleting = false;
    this.tick();
};

TxtType.prototype.tick = function () {

    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.querySelector(".wrap").innerHTML = this.txt;

    var that = this;

    var delta = 150;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;

    } else if (this.isDeleting && this.txt === '') {

        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {

    var elements = document.getElementsByClassName('typewrite');

    for (var i = 0; i < elements.length; i++) {

        var toRotate = elements[i].getAttribute('data-type');

        var period = elements[i].getAttribute('data-period');

        if (toRotate) {

            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};


searchBar.addEventListener("keydown", (e) => {

    if (e.key === "Enter" && selectedCity) {

        getWeather(searchBar.value);

        page2.scrollIntoView({
            behavior: "smooth"
        });
    }
});

icon.addEventListener("click", () => {

    if(selectedCity){

        getWeather(searchBar.value);

        page2.scrollIntoView({
            behavior: "smooth"
        });
    }
 

});


locationBtn.addEventListener("click",() => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat,lon);

            page2.scrollIntoView({
                behavior: "smooth"
            });
        },
        (error) => {
            alert("Location Access denied.");
            console.log(error)
        }
    )
});
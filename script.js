let celsiusTemp;
let kphWind;
const userInput = document.getElementById("user-input");
const searchBtn = document.getElementById("search-button");
const currentTemp = document.getElementById("current-temp");
const windspeed = document.getElementById("current-wind");

const apiKey = "f85370619c6ea62c3477886ea6b559b9";
const tempUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather() {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    const weatherIcon = `images/weather_icons/${data.weather[0].icon}.png`;
    const weatherInfo = data.weather[0].description;
    celsiusTemp = data.main.temp;
    kphWind = data.wind.speed;

    document.getElementById("weather-img").src = weatherIcon;
    document.getElementById("weather-img").title = weatherInfo;
    document.getElementById("current-temp").innerHTML = celsiusTemp.toFixed(1) + "°C";
    document.getElementById("current-time").innerHTML = data.name + " | " + data.sys.country;
    if (data.rain && data.rain["1h"]) {
        document.getElementById("current-precip").innerHTML = "Rain: " + data.rain["1h"] + "mm";
    } else if (data.snow && data.snow["1h"]) {
        document.getElementById("current-precip").innerHTML = "Snow: " + data.snow["1h"] + "mm";
    } else {
        document.getElementById("current-precip").innerHTML = "0mm";
    }
    document.getElementById("current-humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("current-wind").innerHTML = kphWind + " kph";

    document.getElementById("mid-bar").style.display = "block";
    document.getElementById("low-bar").style.display = "flex";
    document.getElementById("pagination-controls").style.display = "block";
}

currentTemp.addEventListener("click", () => {
    if (currentTemp.innerHTML.includes("°C")) {
        currentTemp.innerHTML = `${((celsiusTemp * (9 / 5)) + 32).toFixed(1)}°F`;
    }
    else {
        currentTemp.innerHTML = `${celsiusTemp.toFixed(1)}°C`;
    }
});

windspeed.addEventListener("click", () => {
    if (windspeed.innerHTML.includes("kph")) {
        windspeed.innerHTML = `${(kphWind / 1.609).toPrecision(3)} mph`;
    }
    else {
        windspeed.innerHTML = `${kphWind} kph`;
    }
});

searchBtn.addEventListener("click", () => {
    apiUrl += userInput.value;
    console.log(apiUrl);
    checkWeather();
    apiUrl = tempUrl;
});

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        apiUrl += userInput.value;
        console.log(apiUrl);
        checkWeather();
        apiUrl = tempUrl;
    }
});

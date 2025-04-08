let celsiusTemp;
let kphWind;
let mmPrecip;
let weatherIcon;
let lat;
let lon;
let placeName;
const container = document.getElementById("container");
const userInput = document.getElementById("user-input");

const searchBtn = document.getElementById("search-button");
const currentTemp = document.getElementById("current-temp");
const windspeed = document.getElementById("current-wind");
const precip = document.getElementById("current-precip");

const apiKey = "f85370619c6ea62c3477886ea6b559b9";
const tempUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const apiPlaces = "AIzaSyC9taE0O4I2gUQ65VGKaWWx_zwWPgMQiPw";

const weatherGradients = {
    regular: "linear-gradient(15deg, #87CEEB, #a6a39f)",
    night: "linear-gradient(215deg, #222d5a, #09010c)",
    sunrise: "linear-gradient(15deg, #FFA732, #365b97)",
    sunset: "linear-gradient(15deg, #FFA732, #4a657d)",
    fine: "linear-gradient(15deg, #87CEFA, #41b3ff)",
    clouds: "linear-gradient(to bottom, #D3D3D3, #808080)"
};

async function checkWeather(apiUrl) {
    const response = await fetch(apiUrl);
    var data = await response.json();

    if (response.status == 404) {
        document.getElementById("error").style.display = "block";
        document.getElementById("mid-bar").style.display = "none";
        document.getElementById("low-bar").style.display = "none";
        document.getElementById("pagination-controls").style.display = "none";
    }
    else {
        console.log(data);

        const weatherIcon = `images/weather_icons/${data.weather[0].icon}.png`;
        const weatherInfo = data.weather[0].description;
        celsiusTemp = data.main.temp;
        kphWind = data.wind.speed;
        if ((data.rain && data.rain["1h"])) {
            mmPrecip = data.rain["1h"];
        }
        else if ((data.snow && data.snow["1h"])) {
            mmPrecip = data.snow["1h"];
        }
        else {
            mmPrecip = 0;
        }

        document.getElementById("weather-img").src = weatherIcon;
        document.getElementById("weather-img").title = weatherInfo;
        document.getElementById("current-temp").innerHTML = celsiusTemp.toFixed(1) + "°C";
        if (apiUrl.includes(`lat`)) {
            let newName = userInput.value.split(",");
            newName = newName[0].split(` - `);
            console.log(newName);
            placeName = newName[0];
            document.getElementById("current-time").innerHTML = placeName + " | " + data.sys.country;
        }
        else {
            placeName = data.name;
            document.getElementById("current-time").innerHTML = placeName + " | " + data.sys.country;
        }
        userInput.value = "";

        if (data.weather[0].icon.includes("11")) {
            document.getElementById("current-precip").innerHTML = "Rain: " + mmPrecip + "mm";
            document.getElementById("r1").style.display = "none";
            document.getElementById("r2").style.display = "none";
            document.getElementById("r3").style.display = "none";
            document.getElementById("r4").style.display = "none";
            document.getElementById("r5").style.display = "none";
            document.getElementById("s1").style.display = "none";
            document.getElementById("s2").style.display = "none";
            document.getElementById("s3").style.display = "none";
            document.getElementById("s4").style.display = "none";
            document.getElementById("s5").style.display = "none";
            document.getElementById("t1").style.display = "block";
            document.getElementById("t2").style.display = "block";
            document.getElementById("t3").style.display = "block";
            document.getElementById("t4").style.display = "block";
            document.getElementById("t5").style.display = "block";
        }
        else if ((data.rain && data.rain["1h"]) || (data.weather[0].icon.includes("09") || data.weather[0].icon.includes("10"))) {
            document.getElementById("current-precip").innerHTML = "Rain: " + mmPrecip + "mm";
            document.getElementById("r1").style.display = "block";
            document.getElementById("r2").style.display = "block";
            document.getElementById("r3").style.display = "block";
            document.getElementById("r4").style.display = "block";
            document.getElementById("r5").style.display = "block";
            document.getElementById("s1").style.display = "none";
            document.getElementById("s2").style.display = "none";
            document.getElementById("s3").style.display = "none";
            document.getElementById("s4").style.display = "none";
            document.getElementById("s5").style.display = "none";
            document.getElementById("t1").style.display = "none";
            document.getElementById("t2").style.display = "none";
            document.getElementById("t3").style.display = "none";
            document.getElementById("t4").style.display = "none";
            document.getElementById("t5").style.display = "none";
        } else if ((data.snow && data.snow["1h"]) || data.weather[0].icon.includes("13")) {
            document.getElementById("current-precip").innerHTML = "Snow: " + mmPrecip + "mm";
            document.getElementById("s1").style.display = "block";
            document.getElementById("s2").style.display = "block";
            document.getElementById("s3").style.display = "block";
            document.getElementById("s4").style.display = "block";
            document.getElementById("s5").style.display = "block";
            document.getElementById("r1").style.display = "none";
            document.getElementById("r2").style.display = "none";
            document.getElementById("r3").style.display = "none";
            document.getElementById("r4").style.display = "none";
            document.getElementById("r5").style.display = "none";
            document.getElementById("t1").style.display = "none";
            document.getElementById("t2").style.display = "none";
            document.getElementById("t3").style.display = "none";
            document.getElementById("t4").style.display = "none";
            document.getElementById("t5").style.display = "none";
        }
        else {
            document.getElementById("current-precip").innerHTML = "Rain: " + mmPrecip + "mm";
            document.getElementById("r1").style.display = "none";
            document.getElementById("r2").style.display = "none";
            document.getElementById("r3").style.display = "none";
            document.getElementById("r4").style.display = "none";
            document.getElementById("r5").style.display = "none";
            document.getElementById("s1").style.display = "none";
            document.getElementById("s2").style.display = "none";
            document.getElementById("s3").style.display = "none";
            document.getElementById("s4").style.display = "none";
            document.getElementById("s5").style.display = "none";
            document.getElementById("t1").style.display = "none";
            document.getElementById("t2").style.display = "none";
            document.getElementById("t3").style.display = "none";
            document.getElementById("t4").style.display = "none";
            document.getElementById("t5").style.display = "none";
        }
        document.getElementById("current-humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("current-wind").innerHTML = kphWind + " kph";

        document.getElementById("mid-bar").style.display = "block";
        document.getElementById("low-bar").style.display = "flex";
        document.getElementById("pagination-controls").style.display = "block";

        document.getElementById("error").style.display = "none";
    }

    if (data.dt >= data.sys.sunrise - 3600 && data.dt <= data.sys.sunrise + 3600) {
        container.style.background = weatherGradients.sunrise;
    }
    else if (data.dt >= data.sys.sunset - 1800 && data.dt <= data.sys.sunset + 3600) {
        container.style.background = weatherGradients.sunset;
    }
    else if (data.weather[0].icon.includes("n")) {
        container.style.background = weatherGradients.night;
    }
    else if (data.weather[0].icon.includes("01d")) {
        container.style.background = weatherGradients.fine;
    }
    else if (data.weather[0].icon.includes("02d")) {
        container.style.background = weatherGradients.regular;
    }
    else if (data.weather.description = "mist" || data.weather[0].icon.includes("03d") || data.weather[0].icon.includes("04d") || data.weather[0].icon.includes("09d") || data.weather[0].icon.includes("11d")) {
        container.style.background = weatherGradients.clouds;
    }
    else {
        container.style.background = weatherGradients.regular;
    }
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

precip.addEventListener("click", () => {
    if (precip.innerHTML.includes("mm") && precip.innerHTML.includes("Rain")) {
        precip.innerHTML = `Rain: ${(mmPrecip / 25.4).toFixed(2)}in`;
    }
    else if (precip.innerHTML.includes("in") && precip.innerHTML.includes("Rain")) {
        precip.innerHTML = `Rain: ${mmPrecip}mm`;
    }
    else if (precip.innerHTML.includes("mm") && precip.innerHTML.includes("Snow")) {
        precip.innerHTML = `Snow: ${(mmPrecip / 25.4).toFixed(2)}in`;
    }
    else if (precip.innerHTML.includes("in") && precip.innerHTML.includes("Snow")) {
        precip.innerHTML = `Snow: ${mmPrecip}mm`;
    }
    else if (precip.innerHTML.includes("mm") && mmPrecip == 0) {
        precip.innerHTML = `0in`;
    }
    else {
        precip.innerHTML = `0mm`;
    }
});

function initMap() {
    var searchInput = document.getElementById('user-input');
    if (!searchInput) {
        console.error('User input element not found.');
        return;
    }

    var autocomplete = new google.maps.places.Autocomplete(searchInput, {
        types: ['geocode']
    });

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
            lat = place.geometry.location.lat();
            lon = place.geometry.location.lng();

            console.log('Selected place:', place.formatted_address);
            console.log('Latitude:', lat);
            console.log('Longitude:', lon);

            apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;

        }
    });
}

searchBtn.addEventListener("click", () => {
    if (!userInput.value) {
        alert("Please enter or select a location.");
        return;
    }
    else if (lat && lon) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
        console.log(apiUrl);
        checkWeather(apiUrl);
        lat = undefined;
        lon = undefined;
    }
    else if (userInput.value) {
        apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        apiUrl += userInput.value;
        apiUrl += `&appid=${apiKey}`;
        console.log(apiUrl);
        checkWeather(apiUrl);
        apiUrl = tempUrl;
    }
});

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (lat && lon) {
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
            console.log(apiUrl);
            checkWeather(apiUrl);
            lat = undefined;
            lon = undefined;
        }
        else if (userInput.value) {
            apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
            apiUrl += userInput.value;
            apiUrl += `&appid=${apiKey}`;
            console.log(apiUrl);
            checkWeather(apiUrl);
            apiUrl = tempUrl;
        }
    }
});

rain.addEventListener("animationiteration", () => {
    document.getElementById("r1").style.display = "none";
    document.getElementById("r2").style.display = "none";
    document.getElementById("r3").style.display = "none";
    document.getElementById("r4").style.display = "none";
    document.getElementById("r5").style.display = "none";
});

snow.addEventListener("animationiteration", () => {
    document.getElementById("s1").style.display = "none";
    document.getElementById("s2").style.display = "none";
    document.getElementById("s3").style.display = "none";
    document.getElementById("s4").style.display = "none";
    document.getElementById("s5").style.display = "none";
});

thunder.addEventListener("animationiteration", () => {
    document.getElementById("t1").style.display = "none";
    document.getElementById("t2").style.display = "none";
    document.getElementById("t3").style.display = "none";
    document.getElementById("t4").style.display = "none";
    document.getElementById("t5").style.display = "none";
});
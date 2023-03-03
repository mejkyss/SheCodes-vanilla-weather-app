let apiKey = "f3b08f2120e855cotb88e29725334a5b";
let celsiusTemperature = 7;
let celsiusFeelsLikeTemperature = 15;

//Main functions

function changeBackgroundImage(weatherCondition) {
  let weatherApp = document.querySelector(".weather-app");

  if (weatherCondition === "clear sky") {
    weatherApp.style.backgroundImage = "url('../img/sunny_0.webp')";
  } else if (
    weatherCondition === "few clouds" ||
    weatherCondition === "scattered clouds" ||
    weatherCondition === "broken clouds" ||
    weatherCondition === "overcast clouds"
  ) {
    weatherApp.style.backgroundImage = "url('../img/cloudy_0.png')";
  } else if (
    weatherCondition === "shower rain" ||
    weatherCondition === "rain"
  ) {
    weatherApp.style.backgroundImage = "url('../img/rainy_0.png')";
  } else if (weatherCondition === "snow") {
    weatherApp.style.backgroundImage = "url('../img/snowy_0.webp')";
  } else if (weatherCondition === "mist") {
    weatherApp.style.backgroundImage = "url('../img/misty_0.png')";
  } else if (weatherCondition === "thunderstorm") {
    weatherApp.style.backgroundImage = "url('../img/thunder_storm_0.png')";
  } else {
    weatherApp.style.backgroundImage = "url('../img/test.png')";
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchForCity);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchForCity);

function searchForCity(event) {
  event.preventDefault();
  let searchField = document.querySelector("#search-field");
  let newCityName = searchField.value;
  let url = `https://api.shecodes.io/weather/v1/current?units=metric&query=${newCityName}&key=${apiKey}`;
  axios.get(url).then(replaceAppValues).catch(catchError);
  prepareForecast();
}
function catchError(error) {
  console.error(error);
  alert("Sorry, but you need to spell the city correctly.");
}

function replaceAppValues(response) {
  let newTemperature = response.data.temperature.current;
  let newCityName = response.data.city;

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute("src", response.data.condition.icon_url);

  let oldTemperature = document.querySelector("#current-degrees");
  oldTemperature.innerHTML = `${Math.round(newTemperature)}°`;

  let oldCityName = document.querySelector("#city-name");
  oldCityName.innerHTML = newCityName;

  let weatherStatus = document.querySelector("#weather-status");
  weatherStatus.innerHTML = response.data.condition.description;
  changeBackgroundImage(response.data.condition.description);

  let feelsLike = document.querySelector("#current-feels-like");
  feelsLike.innerHTML = `${Math.round(response.data.temperature.feels_like)}°`;

  let humidity = document.querySelector("#current-humidity-value");
  humidity.innerHTML = `${response.data.temperature.humidity} %`;

  let windSpeed = document.querySelector("#current-wind-speed-value");
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  celsiusTemperature = response.data.temperature.current;
  celsiusFeelsLikeTemperature = response.data.temperature.feels_like;
}

// ----> Current location
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", buttonCurrentLocation);

function buttonCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f3b08f2120e855cotb88e29725334a5b";
  let url = `https://api.shecodes.io/weather/v1/current?units=metric&key=${apiKey}&lon=${lon}&lat=${lat}`;
  axios.get(url).then(replaceAppValues);
  prepareForecast(lat, lon);
}

// Converting between Farenheit & Celsius

let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", displayCelsius);

function displayCelsius(event) {
  event.preventDefault();
  let celsiusTemperatureValue = document.querySelector("#current-degrees");
  celsiusTemperatureValue.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  let celsiusFeelsLikeValue = document.querySelector("#current-feels-like");
  celsiusFeelsLikeValue.innerHTML = `${Math.round(
    celsiusFeelsLikeTemperature
  )}°C`;
}

let farenheitButton = document.querySelector("#farenheit-button");
farenheitButton.addEventListener("click", displayFarenheit);

function displayFarenheit(event) {
  event.preventDefault();
  let fahrenheitTemperatureValue = document.querySelector("#current-degrees");
  fahrenheitTemperatureValue.innerHTML = `${Math.round(
    (celsiusTemperature * 9) / 5 + 32
  )}°F`;
  let fahrenheitFeelsLikeValue = document.querySelector("#current-feels-like");
  fahrenheitFeelsLikeValue.innerHTML = `${Math.round(
    (celsiusFeelsLikeTemperature * 9) / 5 + 32
  )}°F`;
}

// forecast section

function prepareForecast(lat, lon) {
  if (lat !== undefined) {
    let url = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
    axios.get(url).then((response) => displayForecast(response.data.daily));
  } else {
    let searchField = document.querySelector("#search-field");
    let newCityName = searchField.value;
    let url = `https://api.shecodes.io/weather/v1/forecast?query=${newCityName}&key=${apiKey}&units=metric`;
    axios.get(url).then((response) => displayForecast(response.data.daily));
  }
}

function displayForecast(forecast) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
          <div class="weather-forecast-box">
            <div class="day0" id="day0">${formatDay(forecastDay.time)}</div>
            <img
              class="weather-forecast-icon"
              id="forecast-icon-today"
              src=${forecastDay.condition.icon_url}
              alt=""
            />
            <div class="high-low" id="high-low">
              <p class="forecast-high" id="forecast-high">${Math.round(
                forecastDay.temperature.maximum
              )}°</p>
              <p class="forecast-low" id="forecast-low">${Math.round(
                forecastDay.temperature.minimum
              )}°</p>
            </div>
          </div>
        </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//START OF FAKE CODE

function prepareFakeForecast() {
  let forecast = [
    {
      time: 1646102400,
      temperature: { maximum: 15, minimum: 10 },
      condition: {
        icon_url:
          "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png",
      },
    },
    {
      time: 1646188800,
      temperature: { maximum: 18, minimum: 12 },
      condition: {
        icon_url:
          "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png",
      },
    },
    {
      time: 1646275200,
      temperature: { maximum: 20, minimum: 14 },
      condition: {
        icon_url:
          "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png",
      },
    },
    {
      time: 1646361600,
      temperature: { maximum: 22, minimum: 16 },
      condition: {
        icon_url:
          "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png",
      },
    },
    {
      time: 1646448000,
      temperature: { maximum: 24, minimum: 18 },
      condition: {
        icon_url:
          "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png",
      },
    },
  ];

  displayForecast(forecast);
}
prepareFakeForecast();
// END OF FAKE CODE

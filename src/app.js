let apiKey = "f3b08f2120e855cotb88e29725334a5b";

//Main functions

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
  oldTemperature.innerHTML = `${Math.round(newTemperature)}°C`;

  let oldCityName = document.querySelector("#city-name");
  oldCityName.innerHTML = newCityName;

  let weatherStatus = document.querySelector("#weather-status");
  weatherStatus.innerHTML = response.data.condition.description;
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
}

// Converting between Farenheit & Celsius

// let celsiusButton = document.querySelector("#celsius-button");
// celsiustButton.addEventListener("click", displayCelsius);

// function displayCelsius() {}

// let farenheitButton = document.querySelector("#farenheit-button");
// farenheitButton.addEventListener("click", displayFarenheit);

// function displayFarenheit() {}

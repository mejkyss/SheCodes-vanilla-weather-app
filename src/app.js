let apiKey = "f3b08f2120e855cotb88e29725334a5b";

function searchForCity(event) {
  event.preventDefault();
  let searchField = document.querySelector("#search-field");
  let newCityName = searchField.value;
  let url = `https://api.shecodes.io/weather/v1/current?units=metric&query=${newCityName}&key=${apiKey}`;
  axios.get(url).then(logCityValues).catch(catchError);
}

function logCityValues(response) {
  let newTemperature = response.data.temperature.current;
  let newCityName = response.data.city;
  let oldCityName = document.querySelector("#city-name");
  let oldTemperature = document.querySelector("#current-degrees");

  oldCityName.innerHTML = newCityName;
  oldTemperature.innerHTML = `${Math.round(newTemperature)}°C`;
}
function catchError(error) {
  console.error(error);
  alert("Sorry, but you need to spell the city correctly.");
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchForCity);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchForCity);

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
  axios.get(url).then(logCityValues);
}

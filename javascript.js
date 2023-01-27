function submitACity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let currentCity = document.querySelector(".current-city");
  if (searchInput.value) {
    currentCity.innerHTML = `${searchInput.value}`;
  } else {
    currentCity.innerHTML = `Hradec Králové`;
  }
  let apiKey = "ab8a5768a15f9a84dce115b22d102c9d";
  let units = "metric";
  let city = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(`${apiUrl}`);
  axios.get(apiUrl).then(weather);
}

function weather(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${currentTemp}`;
}

function receiveCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ab8a5768a15f9a84dce115b22d102c9d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${currentTemp}`;
}

let submitCurrentLocation = document.querySelector("#current-location-button");
submitCurrentLocation.addEventListener("click", receiveCurrentLocation);

function receiveCityLocation() {
  navigator.geolocation.getCurrentPosition(showCityPosition);
}

function showCityPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ab8a5768a15f9a84dce115b22d102c9d";
  let apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityByGeoLocation);
}

function showCityByGeoLocation(response) {
  console.log(response);
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = response.data[0].name;
}

submitCurrentLocation.addEventListener("click", receiveCityLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitACity);

function toCelsius() {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `17`;
}

let celsius = document.querySelector("#celsius");
let fahr = document.querySelector("#fahr");

celsius.addEventListener("click", toCelsius);

function toFahr() {
  let fahrTemp = document.querySelector("#temperature");
  let convert = Math.round((fahrTemp.innerHTML * 9) / 5 + 32);
  fahrTemp.innerHTML = `${convert}`;
}

fahr.addEventListener("click", toFahr);

let now = new Date();
let dayWeek = document.querySelector("#day-week");
console.log(dayWeek);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
dayWeek.innerHTML = `${day}`;

let time = document.querySelector(".current-time-forecast");
console.log(time);
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
time.innerHTML = `${hours}:${minutes}`;
function defaultTemp() {
  let apiKey = "ab8a5768a15f9a84dce115b22d102c9d";
  let units = "metric";
  let city = `Hradec Kralove`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(weather);
}
defaultTemp();

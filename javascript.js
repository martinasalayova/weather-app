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

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let daysElement = days[date.getDay()];
  return `${daysElement} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row g-0">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm">
        
            <div class="tomorrow-day-date"><strong>${formatDay(
              forecastDay.dt
            )}</strong></div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="clear"
              class="icon-class"
              id="tomorrow-icon"
            />
            <div class="tomorrow-degrees">
              <span class="tomorow-degrees-max"><strong>${Math.round(
                forecastDay.temp.max
              )}°C</strong></span>
              <span class="tomorow-degrees-min">${Math.round(
                forecastDay.temp.min
              )}°C</span>
              <div class="tomorrow-day-forecast"><em>${
                forecastDay.weather[0].description
              }</em></div>
            </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b9ba0314a93083136d968577c718e31d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function weather(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = `${currentTemp}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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
function formatGeoDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let daysElement = days[date.getDay()];
  return `${daysElement} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = `${currentTemp}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatGeoDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = response.data[0].name;
}

submitCurrentLocation.addEventListener("click", receiveCityLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitACity);

function toCelsius() {
  celsius.classList.add("active");
  fahr.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsius = document.querySelector("#celsius");
let fahr = document.querySelector("#fahr");

celsius.addEventListener("click", toCelsius);

function toFahr() {
  let fahrTemp = document.querySelector("#temperature");
  celsius.classList.remove("active");
  fahr.classList.add("active");
  let convert = Math.round((celsiusTemperature * 9) / 5 + 32);
  fahrTemp.innerHTML = `${convert}`;
}

let celsiusTemperature = null;

fahr.addEventListener("click", toFahr);

function defaultTemp() {
  let apiKey = "ab8a5768a15f9a84dce115b22d102c9d";
  let units = "metric";
  let city = `Hradec Kralove`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(weather);
}
defaultTemp();

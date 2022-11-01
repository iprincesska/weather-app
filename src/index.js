function showWeather(response) {
  console.log(response.data.main.temp);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#result-city");
  cityName.innerHTML = response.data.name;
}

function searchCity(event) {
  event.preventDefault();
  let searchText = document.querySelector("#search-text");
  let apiKey = "97f8e93f00107773f88eafd933ce86b7";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" + searchText.value;

  axios.get(apiUrl + "&appid=" + apiKey + "&units=metric").then(showWeather);
}

function retrievePosition(position) {
  let apiKey = "97f8e93f00107773f88eafd933ce86b7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
let current = document.querySelector("#current");
current.addEventListener("click", getCurrentPosition);

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let currentDate = new Date();
let date = document.querySelector("#current-date");
date.innerHTML = formatDate(currentDate);

function convertToCelsius(temperature) {
  return Math.round((temperature - 32) / 1.8);
}
function convertToFahrenheit(temperature) {
  return Math.round(temperature * 1.8 + 32);
}

let toCelsius = document.querySelector("#convert-to-celsius");
toCelsius.addEventListener("click", function (event) {
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = convertToCelsius(currentTemperature.innerText);
});

let toFahrenheit = document.querySelector("#convert-to-fahrenheit");
toFahrenheit.addEventListener("click", function (event) {
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = convertToFahrenheit(
    currentTemperature.innerText
  );
});

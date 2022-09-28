function formatDate(date) {
  let days = [
    "Sundey",
    "Mondey",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day},  ${hours}:${minutes}`;
}
let newdate = document.querySelector("#new-date");
let now = new Date();
newdate.innerHTML = formatDate(now);

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#number");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let windElement = document.querySelector("#new-wind");
  windElement.innerHTML = response.data.wind.speed;
  let humidityElement = document.querySelector("#new-hum");
  humidityElement.innerHTML = response.data.main.humidity;
  let skayElement = document.querySelector("#new-skay");
  skayElement.innerHTML = response.data.weather[0].main;
  console.log(response.data.name);
}

function searchCity(city) {
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=
  ${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?
  lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}
  &units=metric`;
  axios.get(apiUrl).then(showWeather);

  console.log(apiUrl);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let button = document.querySelector("#search-city");
button.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kiev");

// Displaying current date and time:
function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
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
  let day = days[date.getDay()];
  return `Today is ${day} ${hour}:${minute}`;
}

let today = new Date();
let displayDate = document.querySelector("#date");

date.innerHTML = formatDate(today);

// Displaying weather and City

function displayWeather(response) {
  console.log(response);
  let currentTemp = document.querySelector("#degrees");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = response.data.main.humidity;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = response.data.weather[0].main;
  let currentMax = document.querySelector("#max");
  currentMax.innerHTML = Math.round(response.data.main.temp_max);
  let currentMin = document.querySelector("#min");
  currentMin.innerHTML = Math.round(response.data.main.temp_min);
}

// Using the search input as the city input for weather

function searchForCity(city) {
  //receiving the parameter, which will be added into the URL because of the equal name
  let apiKey = "782ad18fe7bd9451c9bf2ed2a9967350";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input").value;
  searchForCity(cityInput); //passing the value of the search input as a parameter to the function searchForCity
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", handleSubmit);

// get weather for current location

function handlePosition(position) {
  let apiKey = "782ad18fe7bd9451c9bf2ed2a9967350";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let locationSearch = document.querySelector("#search-current-location");
locationSearch.addEventListener("click", getCurrentPosition);

// Chaning celsius to fahrenheit when clicking °F
function convertToFahrenheit(event) {
  event.preventDefault();
  let newTempElement = document.querySelector("#degrees");
  let newTemp = newTempElement.innerHTML;
  newTemp = Number(newTemp);
  newTempElement.innerHTML = Math.round(newTemp * 1.8 + 32);
}

let degreesFahrenheit = document.querySelector("#fahrenheit");
degreesFahrenheit.addEventListener("click", convertToFahrenheit);

// Chaning fahrenheit to celsius  when clicking °C ---- NOT FINISHED
function convertToCelsius(event) {
  event.preventDefault();
  let newTempElement = document.querySelector("#degrees");
  let newTemp = newTempElement.innerHTML;
  newTemp = Number(newTemp);
  newTempElement.innerHTML = Math.round(((newTemp - 32) * 5) / 9);
}

let degreesCelsius = document.querySelector("#celsius");
degreesCelsius.addEventListener("click", convertToCelsius);

// Search a default city on reload
searchForCity("Melbourne");

// get random advice button
function displayAdvice(callback) {
  console.log(callback);
  let newAdvice = document.querySelector("#advice");
  newAdvice.innerHTML = callback.data.slip.advice;
}

function handleAdvice(event) {
  event.preventDefault();
  let Url = "https://api.adviceslip.com/advice";
  axios.get(Url).then(displayAdvice);
}

let randomAdvice = document.querySelector("#random-button");
randomAdvice.addEventListener("click", handleAdvice);

// show advice when resfresh
function defaultAdvice() {
  let Url = "https://api.adviceslip.com/advice";
  axios.get(Url).then(displayAdvice);
}
defaultAdvice();

const apiKey = "d0fc90e116d1014dab8a79cec5a5cddd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector('.weather-icon');
const errorContainer = document.querySelector('.error');
const weatherContainer = document.querySelector('.weather');
const cityNameElement = document.querySelector('.city');
const temperatureElement = document.querySelector('.temp');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&units=metric&appid=${apiKey}`);

  if (response.status === 404) {
    errorContainer.style.display = "block";
    weatherContainer.style.display = "none";
  } else {
    const data = await response.json();

    cityNameElement.innerHTML = data.name;
    temperatureElement.innerHTML = Math.round(data.main.temp) + "&degC";
    humidityElement.innerHTML = data.main.humidity + "%";
    windElement.innerHTML = data.wind.speed + " km/h";

    setWeatherIcon(data.weather[0].main);

    weatherContainer.style.display = "block";
    errorContainer.style.display = "none";
  }
}

function setWeatherIcon(weatherMain) {

  if (weatherMain === 'Clouds') {
    weatherIcon.src = 'images/clouds.png';
  } else if (weatherMain === 'Clear') {
    weatherIcon.src = 'images/clear.png';
  } else if (weatherMain === 'Rain') {
    weatherIcon.src = 'images/rain.png';
  } else if (weatherMain === 'Drizzle') {
    weatherIcon.src = 'images/drizzle.png';
  } else if (weatherMain === 'Mist') {
    weatherIcon.src = 'images/mist.png';
  } else {
    weatherIcon.src = 'images/mist.png';
  }
}

function handleSearch() {
  checkWeather(searchBox.value);
}

searchButton.addEventListener("click", handleSearch);

searchBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const card = document.querySelector('.card');
  card.classList.add('show');
});

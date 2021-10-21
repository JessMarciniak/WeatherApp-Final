function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
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

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let currentDate = date.getDate();

  return `${day}, ${month} ${currentDate}  `;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let weatherForecastElement = document.querySelector("#weatherForecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatForecastDay(
        forecastDay.dt
      )}</div>
            <img
        src="images/${forecastDay.weather[0].icon}.png"
        alt=""
        width="42"
      />
      <div class="weather-forecast-temperatures" id="forecastHigh">
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}° /</span> 
        <span class="weather-forecast-temperature-min" id="forecastLow"> ${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>
    `;
      celsiusForecastHigh = forecastDay.temp.max;
      celsiusForecastLow = forecastDay.temp.min;
    }
  });
  forecastHTML = forecastHTML + `</div`;
  weatherForecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "fb57d65c8433d702c30132cfdf5708ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let feelsLikeElement = document.querySelector("#feelsLike");
  let highTempElement = document.querySelector("#highTemp");
  let lowTempElement = document.querySelector("#lowTemp");
  let updateElement = document.querySelector("#lastUpdate");
  let currentDateElement = document.querySelector("#currentDate");
  let weatherIconElement = document.querySelector("#weatherIcon");
  celsiusTemperature = response.data.main.temp;
  celsiusTemperatureMax = response.data.main.temp_max;
  celsiusTemperatureMin = response.data.main.temp_min;
  celsiusFeelsLike = response.data.main.feels_like;
  kilometerWindSpeed = response.data.wind.speed;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed) + " km/h";
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  highTempElement.innerHTML = Math.round(response.data.main.temp_max);
  lowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  updateElement.innerHTML = formatDate(response.data.dt * 1000);
  currentDateElement.innerHTML = formatDay(response.data.dt);
  weatherIconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "fb57d65c8433d702c30132cfdf5708ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "fb57d65c8433d702c30132cfdf5708ba";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  }
}

let currentButton = document.querySelector("#myLocation");
currentButton.addEventListener("click", currentLocation);

function displayFarenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitMax = (celsiusTemperatureMax * 9) / 5 + 32;
  let fahrenheitMin = (celsiusTemperatureMin * 9) / 5 + 32;
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let fahrenheitFeelsLike = (celsiusFeelsLike * 9) / 5 + 32;
  let milesWindSpeed = kilometerWindSpeed / 0.62137119223;
  let fahrenheitForecastHigh = (celsiusForecastHigh * 9) / 5 + 32;
  let fahrenheitForecastLow = (celsiusForecastLow * 9) / +32;
  let highTempElement = document.querySelector("#highTemp");
  let lowTempElement = document.querySelector("#lowTemp");
  let temperatureElement = document.querySelector("#temperature");
  let feelsLikeElement = document.querySelector("#feelsLike");
  let windSpeedElement = document.querySelector("#windSpeed");
  let forecastHighElement = document.querySelector("#forecastHigh");
  let forecastLowElement = document.querySelector("#forecastLow");
  forecastHighElement.innerHTML = Math.round(fahrenheitForecastHigh);
  forecastLowElement.innerHTML = Math.round(fahrenheitForecastLow);
  windSpeedElement.innerHTML = Math.round(milesWindSpeed) + " m/h";
  feelsLikeElement.innerHTML = Math.round(fahrenheitFeelsLike);
  highTempElement.innerHTML = Math.round(fahrenheitMax);
  lowTempElement.innerHTML = Math.round(fahrenheitMin);
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let highTempElement = document.querySelector("#highTemp");
  let lowTempElement = document.querySelector("#lowTemp");
  let temperatureElement = document.querySelector("#temperature");
  let forecastHighElement = document.querySelector("#forecastHigh");
  let forecastLowElement = document.querySelector("#forecastLow");
  let feelsLikeElement = document.querySelector("#feelsLike");
  let windSpeedElement = document.querySelector("#windSpeed");
  windSpeedElement.innerHTML = Math.round(kilometerWindSpeed) + " km/h";
  highTempElement.innerHTML = Math.round(celsiusTemperatureMax);
  lowTempElement.innerHTML = Math.round(celsiusTemperatureMin);
  forecastHighElement.innerHTML = Math.round(celsiusForecastHigh);
  forecastLowElement.innerHTML = Math.round(celsiusForecastLow);
  feelsLikeElement.innerHTML = Math.round(celsiusFeelsLike);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature,
  celsiusTemperatureMax,
  celsiusTemperatureMin,
  celsiusForecastHigh,
  celsiusForecastLow,
  celsiusFeelsLike,
  kilometerWindSpeed = null;

let formElement = document.querySelector("#searchForm");
formElement.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheitLink");
fahrenheit.addEventListener("click", displayFarenheitTemperature);

let celsius = document.querySelector("#celsiusLink");
celsius.addEventListener("click", displayCelsiusTemperature);

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#grid");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="around">
        <span class="col">
        <span class="day">
       
     ${formatDay(forecastDay.dt)} 
    </span>
    <span class="image"><center>
     <img src="http://openweathermap.org/img/wn/${
       forecastDay.weather[0].icon
     }@2x.png" alt="" width="43" />
     
     </center>
    </span>
    
 <span class="high-low">
     <center>
       <span class="high">H: </span>${Math.round(forecastDay.temp.max)}° F
  <br />
   
 
       <span class="low">L: </span>${Math.round(forecastDay.temp.min)}° F
 </center>
 
 </span>
   
    
</span>
</div>
 
     `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b1dd2d686bd068f82cd195d18e48f7d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("h2").innerHTML = response.data.name
    .trim()
    .toUpperCase();

  document.querySelector("#temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}° F`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `<span class="humidity-label">😅Humidity:</span> ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `<span class="wind-label">🎐Wind:</span> ${Math.round(
    response.data.wind.speed
  )} mph`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  //let localUnixTimestamp = response.data.dt + response.data.timezone;
  //document.querySelector("h6").innerHTML = currentDate(
  //localUnixTimestamp * 1000
  //);

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "b1dd2d686bd068f82cd195d18e48f7d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#user-answer").value.trim().toUpperCase();

  if (city === "") {
    alert("Please enter a city!");
  } else {
    searchCity(city);
  }
}

function searchLocation(position) {
  let apiKey = "b1dd2d686bd068f82cd195d18e48f7d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

let dateElement = document.querySelector("#day-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#enter");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#your-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Washington D.C.");

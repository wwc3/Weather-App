let now = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let dayTime = document.querySelector("h6");
  dayTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

  return formatDate;
}
////

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h2 = document.querySelector("h2");

  if (searchInput.value === "") {
    alert("Please enter a city!");
  } else {
    h2.innerHTML = `${searchInput.value.toUpperCase().trim()}`;
    let apiKey = "b1dd2d686bd068f82cd195d18e48f7d2";
    let cityName = h2.innerHTML;
    let units = "imperial";
    let http = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${http}q=${cityName}&units=${units}&appid=${apiKey}`;

    function showTemperature(response) {
      let temperature = Math.round(response.data.main.temp);
      let displayTemp = document.querySelector("#temp");
      displayTemp.innerHTML = `${temperature}°`;
      let humidity = response.data.main.humidity;
      let displayHumidity = document.querySelector("h4");
      let conditions = response.data.weather[0].description;
      let wind = Math.round(response.data.wind.speed);
      displayHumidity.innerHTML = `${conditions} <br> Humidity: ${humidity}% <br> Wind speed: ${wind}km/hr `;
    }
    axios.get(apiUrl).then(showTemperature);
  }
}

let buttonSearch = document.querySelector("#search-button");
buttonSearch.addEventListener("click", showCity);

function showYourLocation(event) {
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "b1dd2d686bd068f82cd195d18e48f7d2";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemp);

    function showTemp(response) {
      let h2 = document.querySelector("h2");
      h2.innerHTML = `${response.data.name}`;

      let temp = Math.round(response.data.main.temp);
      let currentTemp = document.querySelector("#temp");
      currentTemp.innerHTML = `${temp}°`;
      let humidity = response.data.main.humidity;
      let currentHumidity = document.querySelector("h4");
      let conditions = response.data.weather[0].description;
      let wind = Math.round(response.data.wind.speed);
      currentHumidity.innerHTML = `${conditions} <br> Humidity: ${humidity}% <br> Wind speed: ${wind} km/hr`;
    }
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonUserLocation = document.querySelector("#your-location");
buttonUserLocation.addEventListener("click", showYourLocation);

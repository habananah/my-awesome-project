let apiKey = "f722a50d6abe1e4a59e90efe58c43286";

let now = new Date();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
//let date = now.getDate();
//let month = now.getMonth(); ${date}.${month}

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


function showCity(event) {
  event.preventDefault();
  

  let city = document.querySelector("#citySelect");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city.value}`;
  let h2 =  document.querySelector("h2");
  h2.innerHTML = `${day} ${hour}:${minutes}`;

  let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;

  function showTemperature(response) {

    let temp = Math.round(response.data.main.temp);

    let temperature = document.querySelector("span.weatherToday");
    temperature.innerHTML = `${temp}`;
  }

  axios.get(apiUrl1).then(showTemperature);
}

let citySearch = document.querySelector("form");
citySearch.addEventListener("submit", showCity);

function getCurentLocation() {

  function showTemperature(response) {

    let h1 = document.querySelector("h1");
    h1.innerHTML = response.data.name;

    let temp = Math.round(response.data.main.temp);
    let temperature = document.querySelector("span.weatherToday");
    temperature.innerHTML = `${temp}`;


  }
  
  function showPosition(position) {
  
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  
    axios.get(apiUrl2).then(showTemperature);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("form");
currentLocation.addEventListener("submit", getCurentLocation);


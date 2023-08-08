const input = document.getElementById("cityInput");
const apiKey = "0b474c4124961236551bca881fa68502";

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});

function getWeather() {
  const city = input.value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        const weather = String(data.weather[0].main).toLowerCase();

        document.querySelector(".empty").style.display = "none";
        document.getElementById("weatherInfo").style.display = "block";

        document.getElementById("weatherWrap").style.backgroundImage = `url('./assets/weather_${weather}-${Math.floor(Math.random() * 3) + 1}.jpg')`;

        const img = document.querySelector(".weather_icon");
        img.src = `./assets/${weather}.png`;

        const temp = document.querySelector(".temp");
        temp.innerHTML = Math.floor(data.main.temp) + "<span class='unit'>°C</span>";

        const humidity = document.querySelector(".humidity");
        humidity.innerHTML = Math.floor(data.main.humidity) + "%";

        const wind = document.querySelector(".wind");
        wind.innerHTML = Math.floor(data.wind.speed) + "km/h";

        const description = document.querySelector(".description");
        description.innerHTML = data.weather[0].description;
      } else {
        document.querySelector(".empty").style.display = "block";
        document.getElementById("weatherInfo").style.display = "none";
        document.querySelector(".empty").innerHTML = `Oops, something went wrong\n Please try again`;
      }
    });
}

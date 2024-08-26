const apikey = "0ecf956d4ae1984d84c0b3bb51b979f0";

const main = document.getElementById("main");
// @ts-ignore
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
  // @ts-ignore
  const resp = await fetch(url(city), { origin: "cors" });
  const respData = await resp.json();
  console.log(respData);

  addWeatherToPage(respData);
}

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");
  weather.innerHTML = `
    <h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    </h2>
    <small>${data.weather[0].main}</small>
    `;
  // @ts-ignore
  main.innerHTML = "";
  // @ts-ignore
  main.appendChild(weather);
}

function KtoC(K) {
  return Math.floor(K - 273.15);
}

// @ts-ignore
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // @ts-ignore
  const city = search.value;
  if (city) {
    await getWeatherByLocation(city);
  }
});
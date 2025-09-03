const apiKey = 'a61514c67eb64bc7aeb171249253108';
const baseUrl = 'https://api.weatherapi.com/v1/current.json';

const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const weatherCard = document.getElementById('weather-card');
const errorMessage = document.getElementById('error-message');

searchButton.addEventListener('click', handleSearch);

async function handleSearch() {
  const city = cityInput.value.trim();

  if (!city) {
    showError('Please enter a city name.');
    return;
  }

  await fetchWeather(city);
}

async function fetchWeather(city) {
  const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    showWeather(data);
  } catch (err) {
    showError('Network error: ' + err.message);
  }
}

function showWeather(data) {

  document.getElementById('location').textContent = `${data.location.name}, ${data.location.country}`;
  document.getElementById('condition-icon').src = `https://${data.current.condition.icon}`;
  document.getElementById('condition-text').textContent = data.current.condition.text;
  document.getElementById('temp_c').textContent = data.current.temp_c;
  document.getElementById('feelslike_c').textContent = data.current.feelslike_c;
  document.getElementById('humidity').textContent = data.current.humidity;
  document.getElementById('wind_kph').textContent = data.current.wind_kph;
  document.getElementById('last_updated').textContent = data.current.last_updated;

  weatherCard.classList.remove('hidden');
}

//https://api.weatherapi.com/v1/current.json?key=a61514c67eb64bc7aeb171249253108&q=London&aqi=no

/* eslint-disable no-alert */
/* eslint-disable no-console */
import dom from './dom';
import { auth } from './auth'

const events = function events() {
  function showFlow(data) {
    dom().clearForms();
    dom().fillCard(data);
    dom().imageSwitch(data, 'image');
    dom().show('search');

    const farCel = document.getElementById('farCel');
    farCel.onclick = function changeTemp() { dom().converter(data); };
  }

  function forecastFlow(data) {
    dom().clearForms();
    dom().createCard(data);
    dom().show('forecast');
  }

  async function getSearch(city) {
    try {
      // const backendUrl = `http://localhost:8080/api/current/weather?city=${city}`;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=903507f17d707fecd352d38301efba77&units=metric`;
      const response = await fetch(url, { mode: 'cors' });
      const cityData = await response.json();
      showFlow(cityData);
    } catch (error) {
      console.error('Error:', error);
      alert('Could not find the location');
    }
  }

  function getLocation(searchBar) {
    const city = (document.getElementById(searchBar).value).toLowerCase();
    getSearch(city);
  }

  async function getForecast() {
    try {
      const value = (document.getElementById('search').value).toLowerCase();
      // const backendUrl = `http://localhost:8080/api/fourDayForecast?city=${city}`;
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&appid=903507f17d707fecd352d38301efba77`;
      const response = await fetch(url, { mode: 'cors' });
      const cityData = await response.json();
      forecastFlow(cityData);
    } catch (error) {
      console.error('Error:', error);
      alert('Could not find the location');
    }
  }


  return {
    getSearch, showFlow, getForecast, getLocation,
  };
};

export { events as default };
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-alert */
import { dom } from './dom';
import { helpers } from './helpers';

const events = function events() {
  function showFlow(data) {
    dom().clearForms();
    dom().fillCard(data);
    dom().imageSwitch(data, 'image');
    dom().show('search');

    const farCel = document.getElementById('farCel');
    farCel.onclick = function changeTemp() { dom().converter(helpers().getTemp(data)); };
  }

  function forecastFlow(data) {
    dom().clearForms();
    dom().createCard(data);
    dom().show('forecast');
  }

  async function getSearch(searchBar) {
    try {
      const value = (document.getElementById(searchBar).value).toLowerCase();
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=903507f17d707fecd352d38301efba77`;
      const response = await fetch(url, { mode: 'cors' });
      const cityData = await response.json();
      showFlow(cityData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
      alert('Could not find the location');
    }
  }

  async function getForecast() {
    try {
      const value = (document.getElementById('search').value).toLowerCase();
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&appid=903507f17d707fecd352d38301efba77`;
      const response = await fetch(url, { mode: 'cors' });
      const cityData = await response.json();
      forecastFlow(cityData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
      alert('Could not find the location');
    }
  }


  return { getSearch, showFlow, getForecast };
};

export { events };
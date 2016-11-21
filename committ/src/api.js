
const axios = require('axios');

const baseURL = 'https://api.darksky.net/forecast/2abde1e13255f72b54fde93723484c16/';
const instance = axios.create({ baseURL });

/**

 * hafa latt og longi sem args
 * @returns {Promise} - Promise with weather
 */
function promise(latt, longi) {
  latt.toString();
  longi.toString();
  return instance.get(`${latt},${longi}?units=si&lang=en`);
}


module.exports = {
  promise,
};

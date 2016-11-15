
const axios = require('axios');

const baseURL = 'https://api.darksky.net/forecast/2abde1e13255f72b54fde93723484c16/37.8267,-122.4233';
const instance = axios.create({ baseURL });

/**

 *
 * @returns {Promise} - Promise with weather
 */
function promise() {
  return instance.get('?units=si&lang=en');
}


module.exports = {
  promise,
};

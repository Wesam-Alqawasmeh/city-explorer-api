"use strict";
const weatherModel = require("../models/Weather.model");
const axios = require("axios");
let cache = require('../helpers/cache')



let weatherController = (request, response) => {
  let lat = Number(request.query.lat);
  let lon  = Number(request.query.lon);
  getWeather(lat, lon)
   .then(summaries => response.send(summaries))
   .catch((error) => {
     console.error(error);
     response.status(200).send('Sorry. Something went wrong!')
   });
 }  


let getWeather = (latitude, longitude) => {
  const key = 'weather-' + latitude + longitude;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
    .then(response => parseWeather(response.data));
  }
  
  return cache[key].data;
}

let parseWeather = (weatherData) => {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new weatherModel(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}


module.exports = weatherController;

// let weatherController = async (req, res) => {
//   let lattitude = Number(req.query.lat);
//   let longittude = Number(req.query.lon);

//   let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lattitude}&lon=${longittude}&key=${process.env.WEATHER_API_KEY}`;

//   let axiosRes = await axios.get(url);

//   let weatherInformation = axiosRes.data;

//   let cleanData = weatherInformation.data.map((item) => {
//     return new weatherModel(item.datetime, item.weather.description);
//   });

//   res.json(cleanData);
// };



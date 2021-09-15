"use strict";
const weatherModel = require("../models/Weather.model");
const axios = require("axios");

let weatherController = async (req, res) => {
  let lattitude = Number(req.query.lat);
  let longittude = Number(req.query.lon);

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lattitude}&lon=${longittude}&key=${process.env.WEATHER_API_KEY}`;

  let axiosRes = await axios.get(url);

  let weatherInformation = axiosRes.data;

  let cleanData = weatherInformation.data.map((item) => {
    return new weatherModel(item.datetime, item.weather.description);
  });

  res.json(cleanData);
};

module.exports = weatherController;

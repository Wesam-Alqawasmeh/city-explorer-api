"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const weatherData = require("./data/weather.json");
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.get("/weather", (req, res) => {
  let lattitude = Number(req.query.lat);
  let longittude = Number(req.query.lon);
  let name = req.query.q.toLocaleLowerCase();

  let location = [];
  location = weatherData.find(
    (item) =>
      item.lat === lattitude &&
      item.city_name.toLocaleLowerCase() === name &&
      item.lon === longittude
  );

  class Forecast {
    constructor(date, description) {
      (this.date = date), (this.description = description);
    }
  }

  let dayWeather = location.data.map((item) => {
    return new Forecast(item.valid_date, item.weather.description);
  });

  console.log(dayWeather);

  res.json(dayWeather);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

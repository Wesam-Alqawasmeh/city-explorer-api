"use strict";
// ************************************** importing ******************************************
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;
const weatherController = require("./controllers/Weather.controller");
const moviesController = require("./controllers/Movies.controller");
// ***************************************** test ******************************************
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

// *************************************************** weather ******************************************

app.get("/weather", weatherController);

// ************************************* movies *********************************

app.get("/movie", moviesController);

// ******************************* port listen ******************************
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// (req, res) => {
//   let lattitude = Number(req.query.lat);
//   let longittude = Number(req.query.lon);
//   let name = req.query.q.toLocaleLowerCase();

//   let location = [];
//   location = weatherData.find(
//     (item) =>
//       item.lat === lattitude &&
//       item.city_name.toLocaleLowerCase() === name &&
//       item.lon === longittude
//   );

//   let dayWeather = location.data.map((item) => {
//     return new Forecast(item.valid_date, item.weather.description);
//   });

//   console.log(dayWeather);

//   res.json(dayWeather);
// }

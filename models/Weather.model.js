"use strict";

class weatherModel {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
}};

module.exports = weatherModel;

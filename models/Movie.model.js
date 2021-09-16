"use strict";

class movieModel {
  constructor(item) {
    this.name = item.original_title;
    this.description = item.overview;
  }
};

module.exports = movieModel;

"use strict";

const movieModel = require("../models/Movie.model");
const axios = require("axios");

let moviesController = async (req, res) => {
    let region = req.query.country_code.toLocaleUpperCase();
  
    let movieUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_API_KEY}&region=${region}`;
  
    let axiosRes = await axios.get(movieUrl);
  
    let topMovies = axiosRes.data;
  
    let cleanData = topMovies.results.map((item) => {
      return new movieModel(item.original_title, item.overview);
    });
  
    res.json(cleanData);
  };

module.exports = moviesController;
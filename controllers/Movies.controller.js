"use strict";

const movieModel = require("../models/Movie.model");
const axios = require("axios");
let cache = require('../helpers/cache');



let moviesController = (request, response) => {
  let country_code = request.query.country_code;
  getMovie(country_code)
   .then(summaries => response.json(summaries))
   .catch((error) => {
     console.error(error);
     response.status(200).send('Sorry. Something went wrong!')
   });
 }
 
 let getMovie = (country_code) => {
  const key = 'movie-' + country_code;
  let region = country_code.toLocaleUpperCase();

  let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_API_KEY}&region=${region}`;
 
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
      console.log('Cache hit');
    } else {
      console.log('Cache miss');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = axios.get(url)
      .then(response => parseMovie(response.data));
    }
    
    return cache[key].data;

}


let parseMovie = (movieData) => {
  try {
    const movieSummaries = movieData.results.map(item => {
      return new movieModel(item);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}


module.exports = moviesController;
// let moviesController = async (req, res) => {
//     let region = req.query.country_code.toLocaleUpperCase();
  
//     let movieUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_API_KEY}&region=${region}`;
  
//     let axiosRes = await axios.get(movieUrl);
  
//     let topMovies = axiosRes.data;
  
//     let cleanData = topMovies.results.map((item) => {
//       return new movieModel(item.original_title, item.overview);
//     });
  
//     res.json(cleanData);
//   };


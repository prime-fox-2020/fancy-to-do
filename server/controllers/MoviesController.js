const axios = require('axios')

const Movie = axios.create({
  baseURL: 'https://api.trakt.tv/movies',
  timeout: 0,
  headers: {
    'Content-Type': 'application/json',
    'trakt-api-version': 2,
    'trakt-api-key': process.env.TRACKT_ID
  }
})

const Poster = axios.create({
  baseURL: 'http://img.omdbapi.com',
  timeout: 0,
  params: {
    apikey: process.env.OMDB_KEY
  }
})

class MoviesController {
  
  static main(req, res, next) {
    const {query} = req.query
    Movie.get('/trending', {
      params: {
        query,
        extended: 'full'
      }
    }).then(results => {
      results.data.map(movie => movie.movie)
      res.status(200).json(results.data)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
}

module.exports = MoviesController
'use strict'
const axios = require('axios')

class WeatherAPI{
  static getWeather(req, res, next){
    axios({
      method  : 'GET',
      url     : `http://api.openweathermap.org/data/2.5/weather`,
      params: {
        "q" : req.query.q,
        "appid" : process.env.ACCESS_KEY
      }
    })
      .then(location => {
        res.status(200).json(location.data)
      })
      .catch(err => {
        if(err.message === "Request failed with status code 401"){
          next({ name : "JsonWebTokenError"})
        }else if(err.message === "Request failed with status code 400"){
          next({ name : "InvalidParams" })
        }else if(err.message === "Request failed with status code 404"){
          next({ name : "LocationNotFound" })
        }else next(err)
      })
  }
}

module.exports = WeatherAPI
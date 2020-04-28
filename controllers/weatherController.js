const axios = require('axios')

class WeatherController{
    static show(req,res,next){
        // console.log(req.query);
        axios({
            method:'GET',
            url: `http://api.openweathermap.org/data/2.5/weather?q=${req.query.q}&appid=${process.env.API_KEY}`,
            // params : {"q": req.params.q, "appid": process.env.API_KEY}
        })
        .then(result => {
            // console.log(result.data.weather[0].main);
            res.status(200).json({weather : result.data.weather[0].description})
        })
        .catch(err => {
            console.log(err.message);
            next({name: err.message})
        })
    }
}

module.exports = WeatherController
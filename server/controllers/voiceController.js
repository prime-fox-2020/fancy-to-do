const axios = require('axios')
const API_KEY = process.env.API_VOICERSS

class VoiceController{
    static getVoiceRSS(req,res,next){
        axios({
            method: 'GET',
            url : `http://api.voicerss.org/?key=${API_KEY}&hl=en-us&src=${req.params.string}`
        })
        .then(data => {
            res.status(200).json({url : data.config.url})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = VoiceController
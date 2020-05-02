const API_KEY_RSS = process.env.API_KEY_RSS
const axios = require('axios')

class SpeechController{
    static speech(req,res,next){
        // console.log(req.params);
       axios({
                method:"GET",
                url:`http://api.voicerss.org/?key=${API_KEY_RSS}&hl=en-us&r=-2&src=${req.params.string}`
                })
        .then(voice => {
            res.status(200).json({url : voice.config.url})
            // console.log(voice);
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = SpeechController
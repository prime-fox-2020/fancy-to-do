const axios = require('axios');

class prayerTimesController {
    static get(req, res, next) {
        axios({
            "method": "GET",
            "url": "https://aladhan.p.rapidapi.com/timingsByCity",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "aladhan.p.rapidapi.com",
                "x-rapidapi-key": `${process.env.PRAYER_API}`
            }, "params": {
                "city": `${req.params.query}`
            }
        })
            .then((response) => {
                res.status(200).json(response.data)
            })
            .catch((error) => {
                console.log(error)
                next(error)
            })
    }
}

module.exports = prayerTimesController;
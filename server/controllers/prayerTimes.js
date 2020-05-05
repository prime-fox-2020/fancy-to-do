const axios = require('axios');

class prayerTimesController {
    static get(req, res, next) {
        axios({
            "method": "GET",
            "url": "https://aladhan.p.rapidapi.com/timingsByCity",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "aladhan.p.rapidapi.com",
                "x-rapidapi-key": "e10525f62cmsh87bf841e593ee4fp10fad4jsn1d2567a9de7a"
            }, "params": {
                "city": `${req.params.city}`,
                "country":"Indonesia"
            }
        })
            .then((response) => {
                console.log(response)
                res.status(200).json(response.data);
            })
            .catch((error) => {
                console.log(error);
                next({ name: "CITY_NOT_FOUND" });
            })
    }
}

module.exports = prayerTimesController;
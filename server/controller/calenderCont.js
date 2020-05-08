const axios = require('axios');

class Calender {
    static holidays(req, res, next) {
        axios({
            method: 'GET',
            url: 'https://calendarific.com/api/v2/holidays',
            params: {
                "api_key": '4502b99a5a04816d93b08fa1a6b085d0d5abb819',
                "country": req.query.country,
                "year": req.query.year
            }
        })
            .then((data) => {
                if (!data.data.meta.error_type) {
                    res.status(200).json(data.data)
                } else {
                    next({ name: 'DATA_NOT_FOUND' })
                }
            }).catch((err) => {
                next({ name: 'DATA_NOT_FOUND' })
            });
    }
}

module.exports = {
    Calender
};

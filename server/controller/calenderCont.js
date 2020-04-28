const axios = require('axios');

class Calender {
    static holidays(req, res, next) {
        console.log('req: ', req.params); // kenapa req param kosong
        axios({
            method: 'GET',
            url: 'https://calendarific.com/api/v2/holidays',
            params: {
                "api_key": '4502b99a5a04816d93b08fa1a6b085d0d5abb819',
                "country": 'ID',
                "year": 2020
            }
        })
            .then((data) => {
                res.status(200).json(data.data)
            }).catch((err) => {
                next({ name: 'DATA_NOT_FOUND' })
            });
    }
}

module.exports = {
    Calender
};

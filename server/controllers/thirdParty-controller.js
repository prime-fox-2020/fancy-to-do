const axios = require('axios')

class CalendarController {
    static showsCallendar(req, res, next) {
        axios.get('https://calendarific.com/api/v2/holidays', {
            params: {
                'api_key': 'fc24d16705399cb231e56807dfd018bcf351b8e3',
                'country': 'US',
                'year': 2020
            }
        })
        .then(response => {
            res.status(200).json({
                response: response.data})
        })
        .catch(err => {
            res.status(500).json({
                errors: err
            })
        })
    }
}

module.exports = CalendarController
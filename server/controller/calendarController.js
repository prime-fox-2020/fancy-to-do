const axios = require('axios')
const api_key = process.env.API_KEY

class CalendarController {

  static getCalendar(req, res, next) {
    let url = 'https://calendarific.com/api/v2/holidays'

    axios.get(url, {
      params: {
        api_key: api_key,
        country:'ID',
        year:2020
      }
    })
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = CalendarController


const axios = require('axios')

class CalendarController {

  static getCalendar(req, res, next) {
    let url = 'https://calendarific.com/api/v2/holidays'

    axios.get(url, {
      params: {
        api_key: 'a65a12b8ca7cfef89f6ed45d823b232aacffffcb',
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
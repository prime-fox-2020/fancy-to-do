const axios = require('axios')


class Calendar {

  static getCalendar (req,res,next){
    const url = 'https://calendarific.com/api/v2/holidays'
    
    axios.get(url, {
      params: {
        api_key: '7f1f874e7c24ed1d8f31a67ab1d224e30628d6d1',
        country: 'ID',
        year: 2020
      }
    })
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(err=>{
      next(err)
    })
  }

}

module.exports = Calendar
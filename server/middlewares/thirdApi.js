const axios = require('axios')


class Calendar {

  static getCalendar (req,res,next){
    const url = 'https://calendarific.com/api/v2/holidays'
    
    axios.get(url, {
      params: {
        api_key: process.env.calendarApi,
        country: 'ID',
        year: 2020
      }
    })
    .then(response => {
      let result = []
      let datas = response.data.response.holidays
      datas.forEach(list => {
        result.push({
          name: list.name,
          description: list.description,
          date: list.date.iso
        })
      });
      res.status(200).json(result)
    })
    .catch(err=>{
      next(err)
    })
  }

}

module.exports = Calendar
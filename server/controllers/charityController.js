const axios = require('axios')

class charityController{
  static show(req,res,next){
     axios({
       method: 'GET',
       url : `http://data.orghunter.com/v1/categories?user_key=${process.env.API_KEY}`
      //  http://data.orghunter.com/v1/categories?user_key=${process.env.API_KEY}=INI gagal  kak 
     })
     .then(response=>{
       res.status(200).json({
         data: response.data
       })
     })
     .catch(err=>{
       next(err)
     })
  }
}


module.exports = charityController
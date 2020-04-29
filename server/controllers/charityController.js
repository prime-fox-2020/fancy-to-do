const axios = require('axios')

class charityController{
  static show(req,res,next){
     axios({
       method: 'GET',
       url : `http://data.orghunter.com/v1/categories?user_key=14058a8f469257c1a36ca66c5985825d`
      //  http://data.orghunter.com/v1/categories?user_key=${process.env.API-KEY}=INI gagal juga kak 
     })
     .then(response=>{
       res.status(200).json({
         data: response
       })
     })
     .catch(err=>{
       next(err)
     })
  }
}


module.exports = charityController
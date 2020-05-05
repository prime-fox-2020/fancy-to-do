const axios = require('axios');

class muslimSalatController{
    static show(req, res){
        axios.get('https://muslimsalat.com/jakarta/daily.json', {
            params: {
              key: 'api_key?f3a6ef9abc2f845fc4e9971b91308fc4'
            }
          })
          .then(function (response) {
            res.status(200).json(response.data)
            // console.log(response.data);
          })
          .catch(function (error) {
            // console.log(error);
            res.status(500).json(error)
          })
    }

}

module.exports = muslimSalatController
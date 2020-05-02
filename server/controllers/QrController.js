const axios = require('axios')


class QRController{
    static getQR(request,respond,next){
        axios({
            method:'GET',
            url : 'https://free.qrd.by/api/short',
            params : {key : process.env.QR_KEY,url:request.params.text, static : 1}
        })
        .then(response=>{
            // console.log(process.env.QR_KEY)
            // console.log(response.data)
            respond.status(200).json(response.data)
        })
            
        .catch(err=>{
            console.log(err)
        })
    }
}

module.exports = QRController
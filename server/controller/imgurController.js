const axios=require('axios')
const refresh_token=process.env.REFRESH_TOKEN
const client_imgur=process.env.CLIENT_IMGUR
const client_secret=process.env.CLIENT_SECRET
const autho=process.env.AUTHO

class ImgurController{
    static getToken(req,res,next){
        axios({
            method:"POST",
            url:"https://api.imgur.com/oauth2/token",
            data:{
                "refresh_token": refresh_token,
                "client_id": client_imgur,
                "client_secret": client_secret,
                "grant_type": "refresh_token"
            }
        })
        .then(data=>{
            res.status(200).json(data.data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static getImage(req,res,next){
        axios({
            method:"GET",
            url:"https://api.imgur.com/3/account/me/images",
            headers:{
                "Authorization": autho
            }
        })
        .then(data=>{
            res.status(200).json(data.data)
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports=ImgurController
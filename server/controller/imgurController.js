const axios=require('axios')
class ImgurController{
    static getToken(req,res,next){
        axios({
            method:"POST",
            url:"https://api.imgur.com/oauth2/token",
            data:{
                "refresh_token": "d1dfebad83624ae9c387c9b987b99b16d6c291a0",
                "client_id": "ea55b9d74ffb27e",
                "client_secret": "ecb8bc50fab4707e08871761f1dd91c0859ad785",
                "grant_type": "refresh_token"
            }
        })
        .then(data=>{
            res.status(200).json(data.data)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

    static getImage(req,res,next){
        axios({
            method:"GET",
            url:"https://api.imgur.com/3/account/me/images",
            headers:{
                "Authorization": "Bearer 0e03f509c5cbe7a1c7902aea0564766d694ac0b1"
            }
        })
        .then(data=>{
            res.status(200).json(data.data)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

    static uploadImage(req,res,next){
        console.log(req.body)
        // axios({
        //     method:"POST",
        //     url:"https://api.imgur.com/3/upload",
        //     headers:{
        //         "Authorization": "Client-ID ea55b9d74ffb27e"
        //     },
        //     data:{

        //     }
        // })
        // .then(data=>{
        //     res.status(200).json(data)
        // })
        // .catch(err=>{
        //     res.status(400).json(err)
        // })
    }
}

module.exports=ImgurController
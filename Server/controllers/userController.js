const {User} = require('../models')
const {generateToken} = require('../helper/jwt')
const bcrypt = require('bcrypt')

class userController{
    static register(req, res){
        var objUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(objUser)
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err =>{
            res.status(500).json({msg: err.message || "internal server error"})
        })
    }

    static login(req, res){
        
        let objLogin = {
            email: req.body.email,
            password: req.body.password
        }

        User.findOne({where:{
            email: objLogin.email
        }})
        .then(dataUser => {
            if(!dataUser || !bcrypt.compareSync(objLogin.password, dataUser.password)){
                throw res.status(400).json({msg: "Email atau password salah"})
            } else{
                return dataUser
            }

        })
        .then(dataUser =>{
            let access_token = generateToken(dataUser)
            res.status(200).json({access_token})
        })
        
        .catch(err =>{
            res.status(500).json({msg: err.message || "internal server error"})
        })
    }
}

module.exports = userController
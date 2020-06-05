const { User } = require('../models')

const { tokenGenerator } = require('../helpers/jwt')
const bcrypt = require('bcrypt')

class UserController {
    static login(req,res){
        let form = req.body
        const errMessage = {
            status : 400,
            message : 'Invalid Email / Pwd'
        }
        User.findOne({
            where : {
                email : form.email
            }
        })
        .then(user => {
            if(!user || !bcrypt.compareSync(form.password, user.password))
                throw errMessage
            return user
        })
        .then(user => {
            const access_token = tokenGenerator(user)
            res.status(200).json({access_token})
        })
        .catch(err => {
            if(err.status){
                res.status(500).json(err)
            }
        })
    }
    
    static register(req,res){
        let form = req.body
        User.findOne({
            where : {
                email : form.email
            }
        }).then(user=>{
            if(user){
                throw {
                    status : 400,
                    message : 'Email already used!' 
                }
            }else{

                return User.create({
                    email : form.email,
                    password : form.password,
                })
            }
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message : err.message || 'Internal Err Server '
            })
        })
    }
    
    static googleSign(req,res){
        const {OAuth2Client} = require('google-auth-library');
        const CLIENT_ID = '869274600158-aodgh1d327al48qs247c3tsm1o2l5abp.apps.googleusercontent.com'
        const client = new OAuth2Client(CLIENT_ID);
        let EMAIL = null
        client.verifyIdToken({
            idToken : req.body.id_token,
            audience : CLIENT_ID
        }).then(ticket => {
            const payload = ticket.getPayload()
            EMAIL = payload.email
            return User.findOne({
                where: {
                    email : EMAIL
                }
            })
        }).then(user=>{
            if(user){
                const access_token = tokenGenerator(user)
                res.status(200).json({access_token})
                
            }else{
                return User.create({
                    email : EMAIL,
                    password : '123'
                })
            }
        }).then(user=>{
            console.log(user)
            const access_token = tokenGenerator(user)
            res.status(200).json({access_token})

        }).catch(err => {
            console.log(err)
        })
    }
}




module.exports = UserController

/**
 * HTTP Status Code
 * 200 : Ok
 * 201 : Created
 * 400 : Bad Request
 * 401 : Not Authorized
 * 403 : Forbidden
 * 404 : Not Found
 * 500 : Internal Server Error
 * 
 */
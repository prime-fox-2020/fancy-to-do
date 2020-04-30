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
        User.create({
            email : form.email,
            password : form.password,
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
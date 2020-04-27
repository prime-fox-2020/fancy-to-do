const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class UserController{
    static register(req,res){
        const { email, password } = req.body

        User.create({
            email, password
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message : err.message || `Internal Server Error`
            })
        })
    }

    static login(req,res){
        const { email, password } = req.body
        const errorMessage = {status : 400 , message : `Invalid Email/Password`}

        User.findOne({
            where : {email}
        })
        .then(user => {
            if(!user || !comparePassword(password, user.password)){
                throw errorMessage
            }
            return user
        })
        .then(user => {
            const access_token = generateToken(user)
            res.status(200).json(access_token)
        })
        .catch(err => {
            if(err.status){
                res.status(err.status).json({message:err.message})
            }
            res.status(500).json({
                message : err.message || `Internal Server Error`
            })
        })
    }
}

module.exports = UserController
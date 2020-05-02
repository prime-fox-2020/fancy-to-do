const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library')
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID)

class UserController{
    static register(req,res, next){
        const { name, email, password } = req.body

        User.create({
           name, email, password
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            next(err)
            // res.status(500).json({
            //     message : err.message || `Internal Server Error`
            // })
        })
    }

    static login(req,res, next){
        const { email, password } = req.body
        const errorMessage = {status : 400 , message : `Invalid Email/Password`}

        User.findOne({
            where : {email}
        })
        .then(user => {
            if(!user || !comparePassword(password, user.password)){
                next({name : 'Invalid Email/Password'})
                // throw errorMessage
            }
            return user
        })
        .then(user => {
            const access_token = generateToken(user)
            const name = user.name
            res.status(200).json({access_token,name})
        })
        .catch(err => {
            next(err)
            // if(err.status){
            //     res.status(err.status).json({message:err.message})
            // }
            // res.status(500).json({
            //     message : err.message || `Internal Server Error`
            // })
        })
    }

    static googleSignIn(req,res, next){
        console.log(CLIENT_ID)
        const { id_token, g_name } = req.body
        let currentEmail
        client.verifyIdToken({
            idToken : id_token,
            audience : CLIENT_ID
        })
        .then((ticket) => {
            const payload = ticket.getPayload()
            currentEmail = payload['email']

            return User.findOne({
                where : {email : currentEmail}
            })
        })
        .then(user => {
            if(user){
                const access_token = generateToken(user)
                const name = user.name
                res.status(200).json({access_token, name})
            } else {
                return User.create({
                    name : g_name, 
                    email : currentEmail, 
                    password : "fromGoogleSignIn"
                })
            }
        })
        .then(newUser => {
            const access_token = generateToken(newUser)
            const name = newUser.name
            res.status(200).json({access_token, name})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController
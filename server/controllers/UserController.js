const bcrypt = require('bcrypt')
const { User } = require('../models')
const { generateToken } = require('../helpers/generateToken')
const checkEmail = require('../helpers/checkEmail')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client('755451054614-2ksvbnctggrqo8d4c1nd7u73krl5vrdt.apps.googleusercontent.com')

class UserController{
    static register(req, res, next){
        let flagging = true
        const { email, password } = req.body
        checkEmail(email)
        .then(response => {
            if(!response.data.format_valid){
                next({name: 'INVALID_FORMAT_EMAIL'})
            }else if(response.data.did_you_mean){
                next({name : 'EMAIL_SUGGESTION', msg: `Email suggestion:${response.data.did_you_mean}`})
            }else if(!response.data.smtp_check){
                next({name : 'EMAIL_NOT_FOUND'})
            }else{
                flagging = false
                return User.findOne({where: {email}})
            }
        })
        .then(data => {
            if(!flagging){
                if(data){
                    next({name: 'EMAIL_ALREADY_USED'})
                } else {
                    return User.create( { email, password  })
                }
            }
        })
        .then( user => {
            if(user){
                res.status(201).json({id : user.id, email : user.email, password: user.password})
            }
        }) 
        .catch( err => {
            next(err)
        })
    }

    static login(req, res, next){
        const { email, password } = req.body

        User.findOne({
            where: { email }
        })
        .then( user => {
            if(!user || !bcrypt.compareSync(password, user.password)){
                next({name: 'INVALID_EMAIL_PASSWORD'})
            } else {
                const access_token = generateToken(user)
                res.status(200).json( { access_token })
            }
        })
        .catch( err => {
            next(err)
        })
    }

    static googleSign(req, res){
        const token = req.body.id_token
        let emailUser
        client.verifyIdToken({
            idToken: token,
            audience: '755451054614-2ksvbnctggrqo8d4c1nd7u73krl5vrdt.apps.googleusercontent.com',

        })
        .then(ticket => {
            const payload = ticket.getPayload()
            emailUser = payload['email']
            return User.findOne({
                where : { email : emailUser }
            })
        })
        .then( user => {
            if(user){
                const access_token = generateToken(user)
                res.status(200).json({access_token})
                return 
            } else {
                return User.create({
                    email : emailUser,
                    password : '12345'  
                })
            }
        })
        .then( user => {
            const access_token = generateToken(user)
            res.status(200).json({access_token})
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = UserController
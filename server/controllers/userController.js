const { User } = require('../models')
const generateToken = require('../helpers/jwt')
const { checkPwd } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.gClient_id)

class UserController {
    static register (req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: { email }
        }).then(user => {
            if(user) {
                throw { message: "email already being used", status: 400 }
            } else {
                return User.create({
                    email,
                    password
                })
            }
        }).then(user => {
            const access_token = generateToken(user)
            res.status(201).json({
                id: user.id,
                email: user.email,
                password: user.password,
                access_token
            })
        }).catch(next)
    }
    static login (req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: { email }
        }).then(user => {
            if(user){
                const isValid = checkPwd(password, user.password)
                if(isValid) {
                    const access_token = generateToken(user)
                    res.status(200).json({access_token})
                } else {
                    throw { message: "email or password is wrong", status: 400 }
                }
            } else {
                throw { message: "email or password is wrong", status: 400 }
            }
        }).catch(next)
    }
    static googleSign(req, res, next) {
        const { id_token } = req.body
        let email = null
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.gClient_id
        }).then(response => {
            const payload = response.getPayload()
            email = payload.email
            return User.findOne({
                where: { email }
            })
        }).then(user => {
            if(user) {
                const access_token = generateToken(user)
                res.status(200).json({access_token})
            } else {
                return User.create({
                    email,
                    password: "password filler"
                })
            }
        }).then(user => {
            const access_token = generateToken(user)
            res.status(200).json({access_token})
        }).catch(next)
    }
}

module.exports = UserController
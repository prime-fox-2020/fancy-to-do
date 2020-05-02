const { User } = require('../models')
const { checkPassword } = require('../helpers/crypt')
const { generateToken } = require('../helpers/token')
const { verficationGoogle } = require('../helpers/googleOauthApi')

class UserController {
    static signup (req, res, next) {
        let { name, email, password } = req.body
        
        User.create({
            name, email, password
        })
        .then(data => {
            res.status(201).json({
                id: data.id,
                email: data.email,
                password: data.password
            })
        })
        .catch(next)
    }

    static signin (req, res, next) {
        const { email, password } = req.body

        User.findOne({
            where: { email }
        })
        .then(data => {
            if(data) {
                if(checkPassword(password, data.password)){
                    const access_token = generateToken(data)
                    res.set({
                        'access_token': access_token
                    })
                    res.status(200).json({ access_token })
                } else {
                    throw { messages: ['Invalid email/password'], statusCode: 400 }
                }
            } else {
                throw { messages: ['Invalid email/password'], statusCode: 400 }
            }
        })
        .catch(next)
    }

    static notFound (req, res, next) {
        throw { messages: ['Page not found'], statusCode: 404 }
    }

    static googleSignIn (req, res, next) {
        let email, name
        let google_token = req.headers.google_token
        let newUser = false

        verficationGoogle(google_token)
        .then(payload => {
            console.log(payload)
            email = payload.email
            name = payload.name
            return User.findOne({
                where: {
                    email
                }
            })
        })
        .then(user => {
            if (user) {
                return user
            } else {
                newUser = true
                return User.create({
                    email,
                    name,
                    password: process.env.DEFAULT_GOOGLE_PASSWORD
                })
            }
        })
        .then(user => {
            let statusCode = newUser ? 201 : 200;
            let access_token = generateToken(user)
            res.status(statusCode).json({
                access_token
            })
        })
        .catch(next)
    }
}

module.exports = UserController
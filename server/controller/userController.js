const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = "554039684184-2n139m80ct7h9iv8bgk5oradj8p3orm9.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID);

class UserController {
    static registrasi (req, res) {
        const { email, password } = req.body
        console.log({email, password})

        User.create({
            email, 
            password
        })
        .then( user => {
            res.status(201).json(user)
        })
        .catch( err => {
            res.status(500).json({ message: err.message || 'internal error server'})
        })
    }

    static login(req, res) {
        const {email, password} = req.body

        User.findOne({
            where : {email}
        })
        .then( user => {
            if(!user) {
                res.status(400).json({ message : 'invalid Email/Password'})
            } 

            if(!bcrypt.compareSync(password, user.password)) {
                res.status(400).json({ message : 'invalid Email/Password'})
            }

            return user
        })
        .then( user => {
            const access_token = generateToken(user)
            res.status(200).json({access_token})
        })
        .catch( err => {
            res.status(500).json({ message: err.message || 'internal error server'})
        })
    }


    static googleSign(req, res) {
        const token = req.body.id_token
        let currentEmail = null

        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        })
        .then((ticket) => {
            const payload = ticket.getPayload();
            const email = payload['email'];

            currentEmail = email
            return User.findOne({
                where : { email : email }
            })
        })
        .then(user => {
            console.log('user', user)        
            if(user) {
                const access_token = generateToken(user)
                res.status(200).json(access_token)
                //return
            } else {
                console.log(currentEmail)
                User.create({
                    email : currentEmail,
                    password: "randomPassword"
                }).then(newUser => {
                    console.log(newUser)
                    const access_token = generateToken(newUser)
                    res.status(200).json(access_token)
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController
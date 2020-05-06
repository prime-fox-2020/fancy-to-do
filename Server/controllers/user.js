const { User } = require('../models')
const generateToken = require('../helpers/jwt').generateToken
const matchPassword = require('../helpers/matchPassword')
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);

class UserController {
    static register(req, res, next){
        let email = req.body.email
        User.findOne(
            {where : { email: email}}
        )
        .then(userFound => {
            if (userFound) {
                res.status(400).json({message : 'Email already registered!'})
            } else {
                let newUser = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                }
                return User.create(newUser)
            }
        })
        .then(userRegistered => {
            res.status(201).json(userRegistered)
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next){
        let email = req.body.email
        let password = req.body.password
        User.findOne({
            where: {email}
        })
        .then(user => {
            if (!user || !matchPassword(password, user.password)) {
                res.status(400).json({ message : 'Invalid email/ password'})
            }
            return user
        })
        .then(user => {
            const acces_token = generateToken(user)
            res.status(200).json({ acces_token })
        })
        .catch(err => {
            next(err)
        })
    }

    static googleSign(req, res, next){
        const token = req.body.id_token
        let currentEmail = null
        let currentUsername = null

        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            currentEmail = payload['email']
            currentUsername = payload['given_name']

            return User.findOne({
                where: { email: currentEmail }
            })
        })
        .then(user => {
            if(user){
                return user
            } else {
                return User.create({
                    username: currentUsername,
                    email: currentEmail,
                    password: process.env.DEFAULT_PASSWORD
                })
            }
        })
        .then(newUser => {
            const acces_token = generateToken(newUser)
            res.status(200).json({ acces_token })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController
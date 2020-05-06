const { User } = require('../models')
const bcrypt = require('bcryptjs')
const {OAuth2Client} = require('google-auth-library')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

class Control {
    static register(req, res, next) {
        User.create({
            email: req.body.email,
            password: req.body.password
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static login (req, res, next) {
        const { email, password } = req.body
        if (!req.body.email || !req.body.password) {
            next({name: 'SequelizeValidationError'})
        }
        else {
            User.findOne({
                where: {
                    email: email
                }
            })
            .then(data => {
                if(!data || !(bcrypt.compareSync(password, data.password))){
                    next({name: 'LoginValidationError'})
                }
                else{
                    const access_token = jwt.sign({id: data.id, email: data.email}, process.env.secretKey)
                    res.status(201).json({ access_token })
                }
            })
            .catch(err => {
                next({name: 'LoginValidationError'})
            })
        }
    }

    static googleLogin (req, res, next) {
        const token = req.body.token_id
        const client = new OAuth2Client(process.env.client_id);
        let email;

        client.verifyIdToken({
            idToken: token,
            audience: process.env.client_id
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            email = payload['email']

            return User.findOne({
                where: {email: email}
            })
        })
        .then(data => {
            if (data) {
                return data
            }   
            else {
                return User.create({ email, password: 'password' })
            } 
        })
        .then(data => {
            const access_token = jwt.sign({id: data.id, email: data.email}, process.env.secretKey)
            res.status(200).json({access_token})
        })
        .catch(err => {
            next({name: 'LoginValidationError'})
        })
    }
}

module.exports = Control
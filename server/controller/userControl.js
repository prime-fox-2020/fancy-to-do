const { User } = require('../models')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../helper/jwt')
const axios = require("axios");
const {OAuth2Client} = require('google-auth-library')
const dotenv = require('dotenv')
dotenv.config()

class Control {
    static register(req, res, next) {
        axios({
            "method":"GET",
            "url":"https://zerobounce1.p.rapidapi.com/v2/validate",
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"zerobounce1.p.rapidapi.com",
                "x-rapidapi-key":"6a2493f933msh89af1ce3ec969a8p1631adjsn0163c62e9286"
            },"params":{
                "ip_address":"",
                "email":req.body.email
            }
        })
        .then((response)=>{
            if (response.data.status == 'valid') {
                return User.create({
                    email: req.body.email,
                    password: req.body.password
                })  
            }
            else {
                next({name: 'EmailValidationError'})
            }
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

        User.findOne({
            where: {
                email: email
            }
        })
        .then(data => {
            if(data && (bcrypt.compareSync(password, data.password))){
                const access_token = generateToken(data)
                res.status(201).json({ access_token })
            }
            else{
                next({name: 'SequelizeValidationError'})
            }
        })
        .catch(err => {
            next(err)
        })
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
            const access_token = generateToken (data)
            res.status(200).json({access_token})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Control
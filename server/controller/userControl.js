const { User } = require('../models')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../helper/jwt')
const axios = require("axios");


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
                res.status(401).json({message: 'Email invalid'})
            }
        })
        .then(data => {
            res.status(201).json(data)
        })
        // .catch((error)=>{
        //     console.log(error)
        // })
        .catch(err => {
            next(err)
        })
    }

    static login (req, res, next) {
        const { email, password } = req.body
        const errorMessage = {status: 400, message: 'Wrong email and password'}

        User.findOne({
            where: {
                email: email
            }
        })
        .then(data => {
            // console.log(data.id)
            if(!data || !(bcrypt.compareSync(password, data.password))){
                res.status(400).json({message: 'Wrong email and password'})
                // next(errorMessage)
            }else{
                const access_token = generateToken(data)
                res.status(201).json({ access_token })
            }
        })
        .catch(err => {
            next(err)
            // if (err.status) {
            //     res.status(err.status).json({message: err.message})
            // }
            // console.log(err)
            // res.status(500).json(err.message)
        })
    }
}

module.exports = Control
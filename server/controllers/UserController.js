const {User} = require('../models');
const bcrypt = require('bcrypt');
const generateToken = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');


class UserController {
    static login(req, res) {
        const {email, password} = req.body;
        User.findOne({
            attributes: ['id', 'email', 'password'],
            where: {email}
        })
        .then(user => {
            const errMsg = {status: 400, msg:"Invalid email/ password"}
            if (!user || !bcrypt.compareSync(password, user.password)) 
                throw errMsg;
            return user;
        })
        .then(user => {
            const access_token = generateToken(user);
            res.status(201).json({access_token});
        })
        .catch(err => res.status(500).json({message: err.message || 'internal server error'}))
    }

    static register(req, res) {
        const {name, email, password} = req.body;
        User.create({
            name, email, password
        })
        .then(report => res.status(201).json(report))
        .catch(err => res.status(400).json({
            message: err.message || 'internal server error'
        }))
    }

    // static googleLogin(req, res) {
    //     console.log("lenaasdmasdfasdk")
    //     const token = req.body.token_id;
    //     const client = new OAuth2Client(process.env.CLIENT_ID);
    //     let email;
    //     console.log(req.body);
    //     client.verifyIdToken({
    //         idToken: token,
    //         audience: process.env.CLIENT_ID
    //     })
    //     .then(ticket => {
    //         console.log(ticket)
    //         const payload = ticket.getPayload();
    //         email = payload['email'];
    //         return User.findOne({where: {email: email}})
    //     })
    //     .then(data => {
    //         console.log(data);
    //         if (data) {
    //             return data;
    //         } else {
    //             const newUser = {
    //                 email: email,
    //                 password: Math.random(99999999)
    //             }
    //             return User.create(newUser);
    //         }
    //     })
    //     // .then(user => {
    //     //     console.log(user);
    //     //     const access_token = generateToken(user);
    //     //     res.status(201).json({access_token});
    //     // })
    //     .catch(err => {
    //         console.log(err);
    //         next(err);
    //     })
    // }

    static googleLogin(req, res, next) {
        const token = req.body.token_id;
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email;
        // console.log(token)
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            // console.log(ticket)
            const payload = ticket.getPayload();
            email = payload['email'];
            return User.findOne({where: {email: email}});
        })
        .then(user => {
            if (user) return user;
            else return User.create({email, password:Math.random(9999)});
        })
        .then(user => {
            const accessToken = generateToken(user);
            res.status(200).json({accessToken})
        })
        .catch(err => {
            // console.log(err);
            next(err);
        })
    }
}

module.exports = UserController;
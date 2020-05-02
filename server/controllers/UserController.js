const {User} = require('../models');
const bcrypt = require('bcrypt');
const generateToken = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static login(req, res, next) {
        const {email, password} = req.body;
        User.findOne({
            attributes: ['id', 'email', 'password'],
            where: {email} })
        .then(user => {
            if (!user || !bcrypt.compareSync(password, user.password)) 
                next({status: 400, code:"INVALID_EMAIL_PASSWORD"});
            return user; })
        .then(user => {
            const accessToken = generateToken(user);
            res.status(201).json({accessToken}); })
        .catch(err => next(err));
    }

    static register(req, res, next) {
        const {name, email, password} = req.body;
        User.create({name, email, password})
        .then(report => res.status(201).json(report))
        .catch(err => next(err));
    }

    static googleLogin(req, res, next) {
        const token = req.body.token_id;
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email;
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID })
        .then(ticket => {
            const payload = ticket.getPayload();
            email = payload['email'];
            return User.findOne({where: {email: email}}); })
        .then(user => {
            if (user) return user;
            else return User.create({email, password: "defaultPassword"}); })
        .then(user => {
            const accessToken = generateToken(user);
            res.status(200).json({accessToken}); })
        .catch(err => next(err))
    }
}

module.exports = UserController;
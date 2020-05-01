const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/generateToken')
const generator = require('generate-password');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);

class UserController {
    static register(req, res, next) {
        const { email, password } = req.body

        User.create({
            email, password
        })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                if (err.name == 'SequelizeUniqueConstraintError') {
                    next(err.name)
                } else {
                    next(err)
                }
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        const error = { status: 400, message: 'Invalid username / password' }

        User.findOne({
            where: { email }
        })
            .then(user => {
                if (!user || !bcrypt.compareSync(password, user.password)) {
                    throw error
                }

                return user
            })
            .then(user => {
                const access_token = generateToken(user)

                res.status(201).json({ access_token })
            })
            .catch(err => {
                next({ name: err.message })

            })
    }

    static googleLogin(req, res, next) {
        const token = req.body.id_token
        let thisEmail;
        let randomPassword = generator.generate({
            length: 10,
            numbers: true
        });
        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload();
                thisEmail = payload['email'];
                console.log(ticket);

                return User.findOne({
                    where: { email: thisEmail }
                })
            })
            .then(user => {
                if (!user) {
                    return User.create({
                        email: thisEmail, password: randomPassword
                    })
                } else {
                    return user
                }
            })
            .then(user => {
                const access_token = generateToken(user)
                res.status(201).json({ access_token })
            })
            .catch(err => {
                next({ name: err.message })
            })
    }
}

module.exports = UserController
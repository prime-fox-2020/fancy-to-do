require('dotenv').config();
const bcrypt = require('bcryptjs')
const { generateToken } = require('../helpers/generateToken')
const { User } = require('../models');

class UserController {
    static register(req, res, next) {
        // console.log('masuk ke controller');
        const { name, email, password } = req.body;
        User.findOne({
            where: { email }
        })
            .then(data => {
                if (data) {
                    next({ name: 'EMAIL_ALREADY_USED' })
                } else {
                    User.create({ name, email, password })
                }
            })
            .then(data => {
                console.log("created");
                res.status(201).json({ data })
            })
            .catch(err => {
                if (err) {
                    next({ name: 'SequelizeValidationError' })
                }
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({
            where: { email }
        })
            .then(user => {
                if (!user || !bcrypt.compareSync(password, user.password)) {
                    next({ name: 'INVALID_EMAIL_PASSWORD' });
                }
                return user;
            })
            .then(user => {
                const access_token = generateToken(user);
                return res.status(200).json({ access_token });
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = UserController;
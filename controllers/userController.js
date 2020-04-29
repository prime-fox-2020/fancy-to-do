const {User} = require('../models');
const bcrypt = require('bcrypt');
const generateToken = require('../helpers/jwt');

class userController{
    static register(req, res, next) {
        const {email, password} = req.body;

        User.create({email, password})
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            next(err);
        })
    }

    static login(req, res, next) {
        const {email, password} = req.body;

        User.findOne({where: {email}})
        .then(data => {
            if(!data || !bcrypt.compareSync(password, data.password)) next({name: 'LOGIN_FAILED'});
            else {
                const access_token = generateToken(data);
                res.status(200).json({access_token});
            }
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = userController;
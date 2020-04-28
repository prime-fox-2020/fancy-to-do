const {User} = require('../models');
const bcrypt = require('bcrypt');
const generateToken = require('../helpers/jwt');

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
}

module.exports = UserController;
const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static registrasi (req, res) {
        const { email, password } = req.body
        User.create({
            email, password
        })
        .then( user => {
            res.status(201).json(user)
        })
        .catch( err => {
            res.status(500).json({ message: err.message || 'internal error server'})
        })
    }

    static login(req, res) {
        const {email, password} = req.body

        User.findOne({
            where : {email}
        })
        .then( user => {
            if(!user) {
                res.status(400).json({ message : 'invalid Email/Password'})
            } 

            if(!bcrypt.compareSync(password, user.password)) {
                res.status(400).json({ message : 'invalid Email/Password'})
            }

            return user
        })
        .then( user => {
            const access_token = generateToken(user)
            res.status(200).json({access_token})
        })
        .catch( err => {
            res.status(500).json({ message: err.message || 'internal error server'})
        })
    }
}

module.exports = UserController
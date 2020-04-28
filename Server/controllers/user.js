const { User } = require('../models')
const generateToken = require('../helpers/generateToken')
const matchPassword = require('../helpers/matchPassword')

class UserController {
    static register(req, res, next){
        let email = req.body.email
        User.findOne(
            {where : { email: email}}
        )
        .then(userFound => {
            if (userFound) {
                res.status(400).json({message : 'email already registered'})
            } else {
                let newUser = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                }
                return User.create(newUser)
            }
        })
        .then(userRegistered => {
            res.status(201).json(userRegistered)
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next){
        let email = req.body.email
        let password = req.body.password
        User.findOne({
            where: {email}
        })
        .then(user => {
            if (!user || !matchPassword(password, user.password)) {
                res.status(400).json({ message : 'Invalid email/ password'})
            }
            return user
        })
        .then(user => {
            const acces_token = generateToken(user)
            res.status(200).json({ acces_token })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController
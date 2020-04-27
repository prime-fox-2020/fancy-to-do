const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static register(request, respond) {
        const { email, password } = request.body
        User.create({
            email, password
        })
            .then(user => {
                respond.status(201).json(user)
            })
            .catch(err => {
                respond.status(500).json({
                    message: err.message || 'Internal error Server'
                })
            })
    }
    static login(request, respond) {
        const { email, password } = request.body
        User.findOne({
            where: { email }
        })
            .then(user => {
                if (!user) {
                    respond.status(400).json({ message: 'Invalid Email/Password!' })
                }

                if (!bcrypt.compareSync(password, user.password)) {
                    respond.status(400).json({ message: 'Invalid Email/Password!' })

                }
                return user
            })
            .then(user => {
                const secretKey = "rahasia   "
                const access_token = jwt.sign(
                    { id: user.id, email: user.email }
                    , secretKey
                )
                respond.status(200).json({ access_token})
            })
            .catch(err => {
                respond.status(500).json({ message: err.message || 'Internal Server Error' })
            })
    }
}


module.exports = UserController
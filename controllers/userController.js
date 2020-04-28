const { User } = require('../models')
const bcrypt = require('bcrypt')
const {generateToken} = require('../helpers/jwt.js')

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
        const errorMessage  = {status :400, message: 'Invalid Email/Password'}
        User.findOne({
            where: { email }
        })
            .then(user => {
                if (!user || !bcrypt.compareSync(password, user.password)) {
                    throw errorMessage
                    // respond.status(400).json({ message: 'Invalid Email/Password!' })
                }
            
                return user
            })
            .then(user => {
                const access_token = generateToken(user)
                respond.status(200).json({ access_token})
            })
            .catch(err => {
                if(err.status){
                    respond.status(err.status).json({
                        message: err.message
                    })
                }
                respond.status(500).json({ message: err.message || 'Internal Server Error' })
            })
    }
}


module.exports = UserController
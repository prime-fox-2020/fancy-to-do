const { User } = require('../models')
const bcrypt = require('bcrypt')                             // jwt proced
const { generateToken } = require('../helpers/jwt')          // jwt proced

class UserController {

    static registerUser(req, res){
        let { id, email, password } = req.body;
        User.create({
            id, email, password
        })
        .then( user => {
            if (user) {
                res.status(201).json({ TodoUser: user})
            } else {
                res.status(400).json({ 
                    error: err.message || 'error - bad request'
                })
            }
        })
        .catch( err => {
            res.status(500).json({ 
                error: err.message || 'internal server error'
            })
        })

    }

    // for generate token after login (check helper)
    static loginUser(req, res){
        let { email, password } = req.body
        
        User.findOne({
            where: { email }
        })
        .then( user => {
            if (!user || !bcrypt.compareSync(password, user.password)) {
                res.status(400).json({ message: 'Invalid email / password' })
            }

            return user
        })
        .then( user => {
            const access_token = generateToken(user)
            res.status(201).json({ access_token })
        })
        .catch( err => {
            res.status(500).json({ 
                error: err.message || 'internal server error'
            })
        })

    }
}

module.exports = UserController;

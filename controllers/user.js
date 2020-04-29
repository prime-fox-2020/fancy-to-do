const { User } = require('../models')
const { checkPassword } = require('../helpers/crypt')
const { generateToken } = require('../helpers/token')

class UserController {
    static signup (req, res) {
        let { name, email, password } = req.body
        
        User.create({
            name, email, password
        })
        .then(data => {
            res.status(201).json({
                id: data.id,
                email: data.email,
                password: data.password
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    }

    static signin (req, res) {
        const { email, password } = req.body

        User.findOne({
            where: { email }
        })
        .then(data => {
            if(!data || !(checkPassword(password, data.password))){
                res.status(400).json({ message: 'Invalid email/password'})
            }
            return data
        })
        .then(data => {
            const access_token = generateToken(data)
            res.set({
                'access_token': access_token
            })
            res.status(200).json({ access_token })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    }
}

module.exports = UserController
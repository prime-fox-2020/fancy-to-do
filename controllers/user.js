const { User } = require('../models')
const { checkPassword } = require('../helpers/crypt')
const { generateToken } = require('../helpers/token')

class UserController {
    static signup (req, res, next) {
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
        .catch(next)
    }

    static signin (req, res, next) {
        const { email, password } = req.body

        User.findOne({
            where: { email }
        })
        .then(data => {
            if(data) {
                if(checkPassword(password, data.password)){
                    const access_token = generateToken(data)
                    res.set({
                        'access_token': access_token
                    })
                    res.status(200).json({ access_token })
                } else {
                    throw { messages: ['Invalid email/password'], statusCode: 400 }
                }
            } else {
                throw { messages: ['Invalid email/password'], statusCode: 400 }
            }
        })
        .catch(next)
    }

    static notFound (req, res, next) {
        throw { messages: ['Page not found'], statusCode: 404 }
    }
}

module.exports = UserController
const { User } = require('../models')
const generateToken = require('../helpers/jwt')
const { checkPwd } = require('../helpers/bcrypt')

class UserController {
    static register (req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: { email }
        }).then(user => {
            if(user) {
                throw { message: "email already being used", status: 400 }
            } else {
                return User.create({
                    email,
                    password
                })
            }
        }).then(user => {
            const access_token = generateToken(user)
            res.status(201).json({
                id: user.id,
                email: user.email,
                password: user.password,
                access_token
            })
        }).catch(next)
    }
    static login (req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: { email }
        }).then(user => {
            if(user){
                const isValid = checkPwd(password, user.password)
                if(isValid) {
                    const access_token = generateToken(user)
                    res.status(200).json({access_token})
                } else {
                    throw { message: "email or password is wrong", status: 400 }
                }
            } else {
                throw { message: "email or password is wrong", status: 400 }
            }
        }).catch(next)
    }
}

module.exports = UserController
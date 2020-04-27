const { User } = require('../models')
const generateToken = require('../helpers/jwt')
const { checkPwd } = require('../helpers/bcrypt')

class UserController {
    static register (req, res) {
        const { email, password } = req.body
        User.findOne({
            where: { email }
        }).then(response => {
            if(response) {
                res.status(400).json({message: "email already exist"})
            } else {
                return User.create({
                    email,
                    password
                })
            }
        }).then(user => {
            res.status(201).json({id: user.id, email: user.email, password: user.password})
        }).catch(err => {
            console.log(err)
        })
    }
    static login (req, res) {
        const { email, password } = req.body
        User.findOne({
            where: { email }
        }).then(response => {
            console.log(response)
            if(response){
                const isValid = checkPwd(password, response.password)
                if(isValid) {
                    const access_token = generateToken(response)
                    res.status(200).json({access_token})
                } else {
                    res.status(400).json({message: "email or password is wrong"})
                }
            } else {
                res.status(400).json({message: "email or password is wrong"})
            }
        }).catch(err=> {
            console.log(err)
        })
    }
}

module.exports = UserController
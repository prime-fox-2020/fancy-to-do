const { User } = require('../models')
const generateToken = require('../helpers/jwt')
const { checkPwd } = require('../helpers/bcrypt')

class UserController {
    static register (req, res) {
        const { email, password } = req.body
        User.findOne({
            where: { email }
        }).then(user => {
            if(user) {
                res.status(400).json({message: "email already being used"})
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
            console.log(user)
            if(user){
                const isValid = checkPwd(password, user.password)
                if(isValid) {
                    const access_token = generateToken(user)
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
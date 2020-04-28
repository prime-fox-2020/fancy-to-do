const bcrypt = require('bcrypt')
const { User } = require('../models')
const { generateToken } = require('../helpers/generateToken')

class UserController{
    static register(req, res, next){
        const { email, password } = req.body

        User.findOne({where : {email}})
        .then(data => {
            if(data){
                next({name: 'EMAIL_ALREADY_USED'})
            } else {
                return User.create( { email, password  })
            }
        })
        .then( user => {
            res.status(201).json({id : user.id, email : user.email, password: user.password})
        })
        .catch( err => {
            next(err)
        })
    }

    static login(req, res, next){
        const { email, password } = req.body

        User.findOne({
            where: { email }
        })
        .then( user => {
            if(!user || !bcrypt.compareSync(password, user.password)){
                next({name: 'INVALID_EMAIL_PASSWORD'})
            }
            return user
        })
        .then( user => {
            const access_token = generateToken(user)
            res.status(200).json( { access_token })
        })
        .catch( err => {
            next(err)
        })
    }
}

module.exports = UserController
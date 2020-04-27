const bcrypt = require('bcrypt')
const { User } = require('../models')
const { generateToken } = require('../helpers/generateToken')

class UserController{
    static register(req, res){
        const { email, password } = req.body

        User.findOne({where : {email}})
        .then(data => {
            if(data){
                res.status(400).json({message: 'Email has been already used'})
            } else {
                return User.create( { email, password  })
            }
        })
        .then( data => {
            res.status(201).json(data)
        })
        .catch( err => {
            if(err.errors){
                const validationError = []
                for(let i = 0; i < err.errors.length; i++){
                    validationError.push(err.errors[i].message)
                }
                res.status(400).json({'validation errors' : validationError.join(', ')})
            } else {
                res.status(500).json({ message : 'Internal Server Error'})
            }
        })
    }

    static login(req, res){
        const { email, password } = req.body
        const errorMessage = { status: 400, message: 'Invalid Email / Password'}

        User.findOne({
            where: { email }
        })
        .then( user => {
            if(!user || !bcrypt.compareSync(password, user.password)){
                throw errorMessage
            }
            return user
        })
        .then( user => {
            const access_token = generateToken(user)
            res.status(200).json( { access_token })
        })
        .catch( err => {
            if(err.status){
                res.status(err.status).json({message : err.message})
            }
            res.status(500).json({message: err.message || 'Internal Server Error'})
        })
    }
}

module.exports = UserController
const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../middlewares/generateToken')

class UserController{
    static register(req,res){
        const { email, password } = req.body

        User.create({
            email , password
        })
        .then( user => {
            console.log(user);
            res.status(201).json(user)
        })
        .catch( err => {
            console.log(err);
            res.status(400).json({
                message: err.message || 'Internal Server Error'
            })
        })
    }

    static login(req,res){
        const { email, password } = req.body
        const error = { status: 400, message: 'Invalid username / password'}

        User.findOne({
            where : { email }
        })
        .then(user => {
            if(!user || !bcrypt.compareSync(password, user.password)){
                throw error
            }
            
            return user
        })
        .then(user => {
            const access_token = generateToken(user)
            
            res.status(201).json({ access_token })
        })
        .catch(err => {
            if(err.status){
                res.status(err.status).json({message : err.message})
            }else{
                res.status(500).json({message: err.message || 'Internal Server Error'})
            }

        })
    }
}

module.exports = UserController
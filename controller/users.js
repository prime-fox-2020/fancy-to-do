const UserModel = require('../models').User
const bcrypt = require('bcryptjs')
const { tokenGen } = require('../helper/jwt')

class Users{
    static register(req, res){
        const {email, pass} = req.body

        UserModel.create({
            email, pass
        })
        .then(user =>{
            res.status(201).json(user)
        })
        .catch( err=>{
            res.status(500).json({
                message: err.message || 'internal error server'
            })
        })
    }

    static login(req, res){
        const {email, pass} = req.body
        const errorMessage = {status: 400, message: 'invalid email or password'}

        UserModel.findOne({
            where: { email }
        })
        .then( user =>{
            if(!user || !bcrypt.compareSync(pass, user.pass)){
                throw errorMessage
                // res.status(400).json({message: 'invalid email or password'})
            }

            return user
        })
        .then( user=>{
            const access_token = tokenGen(user)

            res.status(200).json({access_token})
        })
        .catch( err=>{
            if(err.status){
                res.status(err.status).json({message: err.message})
            }
            res.status(500).json({message: err.message || 'internal server error'})
        })
    }
}

module.exports = Users
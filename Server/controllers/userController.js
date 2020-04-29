const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../middlewares/generateToken')

class UserController{
    static register(req,res,next){
        const { email, password } = req.body

        User.create({
            email , password 
        })
        .then( user => {
            res.status(201).json(user)
        })
        .catch( err => {
            if(err.name == 'SequelizeUniqueConstraintError'){
                next(err.name)
            }else{
                next(err)
            }
        })
    }

    static login(req,res,next){
        const { email, password } = req.body
        const error = { status: 400, message: 'Invalid username / password'}

        User.findOne({
            where : { email }
        })
        .then(user => {
            // console.log(user);
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

            next({name : err.message })

        })
    }
}

module.exports = UserController
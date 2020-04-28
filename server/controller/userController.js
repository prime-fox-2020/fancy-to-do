const {User}=require('../models')
const bcrypt = require('bcrypt');
const generateToken=require('../helpers/jwt')

class UserController{
    static register(req,res){
        const {email,password}=req.body
        User.create({
            email,password
        })
        .then(()=>{
            User.findAll()
            .then(data=>{
                res.status(201).json(data)
            })
            .catch(err=>{
                res.status(400).json({errors:err.message})
            })
        })
        .catch(err=>{
            res.status(400).json({errors:err.message})
        })
    }

    static login(req,res){
        const {email,password}=req.body

        User.findOne({
            where:{
                email
            }
        })
        .then(user=>{
            if(!user || !bcrypt.compareSync(password,user.password)){
                res.status(400).json({message:"Invalid Email/Password"})
            }

            return user
        })
        .then(user=>{
            const access_token=generateToken(user)  

            res.status(200).json({access_token})
        })
        .catch(err=>{
            res.status(400).json({errors:err.message})
        })

    }
}

module.exports=UserController
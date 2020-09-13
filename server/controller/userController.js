const {User}=require('../models')
const bcrypt = require('bcrypt');
const generateToken=require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID=process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);

class UserController{
    static register(req,res,next){
        const {email,password}=req.body
        User.create({
            email,password
        })
        .then(()=>{
            return User.findAll()
        })
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            if(err.name=="SequelizeValidationError"){
                next(err)
            }else{
                next({name:"NEED_ARGUMENT"})
            }
        })
    }

    static login(req,res,next){
        const {email,password}=req.body

        User.findOne({
            where:{
                email
            }
        })
        .then(user=>{
            if(!user || !bcrypt.compareSync(password,user.password)){
                next({name:"INVALID_ID"})
            }

            return user
        })
        .then(user=>{
            const access_token=generateToken(user)  

            res.status(200).json({access_token})
        })
        .catch(err=>{
            next({name:"NEED_ARGUMENT"})
        })

    }

    static googleLogin(req,res,next){
        const token=req.headers.google_token
        let currentEmail
        client.verifyIdToken({
            idToken:token,
            audience:CLIENT_ID
        })
        .then(access=>{
            const payload = access.getPayload();
            currentEmail = payload['email'];
            return User.findOne({
                where:{
                    email:currentEmail
                }
            })
        })
        .then(user=>{
            if(user){
                const access_token=generateToken(user)
                res.status(200).json({access_token})
                return
            }else{
                return User.create({
                    email: currentEmail,
                    password:"randompassword"
                })
            }
        })
        .then(newUser=>{
            const access_token=generateToken(newUser)
            res.status(200).json({access_token})
        })
        .catch(err=>{
            next(err)
        })

    }
}

module.exports=UserController
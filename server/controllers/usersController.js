const { User } = require('../models')
const bcrypt = require('bcrypt')
const {generateToken} = require('../helpers/jwt')
const axios = require('axios')
// const googleVerification = require('../helpers/googleOauthApi.js');
const { OAuth2Client } = require('google-auth-library')

class UserController {
  static register(req,res,next){
    const {email, password} = req.body
    User.findOne({
        where : {
          email : email
        }
      })
      .then(user =>{
        if(user){
          res.status(400).json({message:'Email has been already registered'})
        } else{
          return User.create({email,password})
        }
      })
      .then(user=>{
        axios({
          method:"POST",
          url:"https://simplemailsender.p.rapidapi.com/SendMails/Send",
          headers:{
              "x-rapidapi-host":"simplemailsender.p.rapidapi.com",
              "x-rapidapi-key":"4e0e3fc803mshecdbceee149660bp1f41c7jsnd56619c29ad2"
          },
          data:{
              Correo_Delivery : req.body.email,
              Mensjae : "Successfully Registered on Elvan's Fancy Todo"
          }
        })
        res.status(201).json({id: user.id, email:user.email, password:user.password, message:'successfully registered'})
      })
    .catch((error)=>{
      next({name: "RegisterError", message : error})
    })
  }

  static login(req,res){
    const {email, password} = req.body
    const errorMessage = { status: 400, message: 'Invalid Email / Password'}

    User.findOne({
      where: { email }
    })
    .then(user=>{
      if(!user || !bcrypt.compareSync(password, user.password)){
        throw errorMessage
      }
      return user
    })
    .then(user=>{
      const access_token = generateToken(user)
      res.status(200).json({ access_token })
    })
    .catch(err=>{
      res.status(400).json({
        message: err.message || 'Bad Request'
      })
    })
  }

  static googleLogin(req,res,next){
    const client = new OAuth2Client(process.env.CLIENT_ID)
    const id_token = req.headers.id_token
    let email = ''
    // console.log(req.body.id_token);
    client.verifyIdToken({
      idToken : id_token,
      audience: process.env.CLIENT_ID
    })
    .then(ticket=>{
      // console.log(ticket);
      email = ticket.getPayload().email
      return User.findOne({
        where : {
          email : email
        }
      })
    })
    .then(data=>{
      if (data){
        return data
      } else {
        return User.create({
          email : email,
          password : process.env.DEFAULT_GOOGLE_PASSWORD
        })
      }
    })
    .then(data=>{
      let user = {id : data.id, email : data.email}
      let token = generateToken(user)
      return res.status(201).json({
          id : user.id,
          email : user.email,
          access_token : token
        })
    })
    .catch(err=>{
      next(err)
    })
  }

}


module.exports = UserController
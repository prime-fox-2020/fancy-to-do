const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/jwt.js')
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "978599458723-okfjfp36vsffad7jr54tccib5jikoj0c.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID);

class UserController {
    static register(request, respond) {
        const { email, password } = request.body
        User.create({
            email, password
        })
            .then(user => {
                respond.status(201).json(user)
            })
            .catch(err => {
                respond.status(500).json({
                    message: err.message || 'Internal error Server'
                })
            })
    }
    static login(request, respond) {
        const { email, password } = request.body
        const errorMessage = { status: 400, message: 'Invalid Email/Password' }
        User.findOne({
            where: { email }
        })
            .then(user => {
                if (!user || !bcrypt.compareSync(password, user.password)) {
                    throw errorMessage
                    // respond.status(400).json({ message: 'Invalid Email/Password!' })
                }

                return user
            })
            .then(user => {
                console.log('logged in!')
                const access_token = generateToken(user)
                console.log(access_token)
                respond.status(200).json({access_token})
            })
            .catch(err => {
                if (err.status) {
                    respond.status(err.status).json({
                        message: err.message
                    })
                }
                respond.status(500).json({ message: err.message})
            })
    }
  
    static googleSign(request, respond) {
        const token = request.body.id_token
        let currentEmail = null
        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        })
        .then(ticket=>{
            const payload = ticket.getPayload();
            console.log(payload,'this is payload')
            currentEmail = payload['email'];

            return User.findOne({
                where: { email : currentEmail}
            })
          

        })
        .then(user=>{
            console.log(user, 'this is userrrrrrr-----------')
            if(user){
                const access_token = generateToken(user)
                respond.status(200).json({access_token})
                return
            }else{
                 return User.create({
                    email : currentEmail,
                    password: "randomPass"
                })
            }
        })
        .then(newUser=>{
            const access_token = generateToken(newUser)
            respond.status(200).json({access_token})
        })

        .catch(err=>{
            console.log(err)
        })

    }
}


module.exports = UserController
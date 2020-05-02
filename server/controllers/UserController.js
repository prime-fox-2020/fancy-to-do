const { User } = require('../models')
const bcrypt = require('bcrypt')                             // jwt proced
const { generateToken } = require('../helpers/jwt')          // jwt proced

const {OAuth2Client} = require('google-auth-library');       //google proced
const client = new OAuth2Client(process.env.CLIENT_ID);      //google proced

class UserController {

    static registerUser(req, res){
        let { email, password } = req.body;
        User.create({
            email, password
        })
        .then( user => {
            if (user) {
                res.status(201).json({ TodoUser: user})
            } else {
                res.status(400).json({ 
                    message: err.message || 'error - bad request'
                })
            }
        })
        .catch( err => {
            next(err)
        })

    }

    // for generate token after login (check helper)
    static loginUser(req, res){
        let { email, password } = req.body
        
        User.findOne({
            where: { email }
        })
        .then( user => {
            if (!user || !bcrypt.compareSync(password, user.password)) {
                res.status(400).json({ message: 'Invalid email / password' })
            }

            return user
        })
        .then( user => {
            const access_token = generateToken(user)
            res.status(201).json({ access_token })
        })
        .catch( err => {
            next(err)
        })

    }

    static googleUser(req, res) {
        const token = req.body.id_token
        let recent_email = null

        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            // payload['email'];
            recent_email = payload.email;

            return User.findOne({
                where: { email: recent_email }
            })
        })
        .then( isUser => {
            //kalau isUser ada
            if (isUser) {
                const access_token = generateToken(isUser)
                res.status(200).json({ access_token })
                return
            } else { 
                //kalao isUser gakada ya create baru
                return User.create({
                    email: recent_email,
                    password: 'randomPassword'
                })
            }
        })
        .then(newUser =>{
            const access_token = generateToken(newUser)
            res.status(200).json({ access_token })
        })
        .catch(err => {
            console.log(err)
        })        
    }
}

module.exports = UserController;

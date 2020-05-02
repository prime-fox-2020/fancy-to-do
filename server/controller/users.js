const UserModel = require('../models').User
const bcrypt = require('bcryptjs')
const {OAuth2Client} = require('google-auth-library');
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

    static googleSignIn(req, res, next){
        console.log('ini masuk googleSignIn')
        const token = req.body.token
        let email;
        
        const client = new OAuth2Client(process.env.client_id);
        client.verifyIdToken({
            idToken: token,
            audience: process.env.client_id,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then( ticket=>{
            const payload = ticket.getPayload();
            email = payload['email'];
            return UserModel.findOne({
                where: {email: email}
            })
        })
        .then( data=>{
            if(data){
                return data
            } else {
                return UserModel.create({email, pass: 'wololo'})
            }
        })
        .then( data=>{
            const access_token = tokenGen(data)

            res.status(200).json({access_token})
        })
        .catch(err=>{
            next(err)
        })
        // If request specified a G Suite domain:
        //const domain = payload['hd'];

    }
}

module.exports = Users
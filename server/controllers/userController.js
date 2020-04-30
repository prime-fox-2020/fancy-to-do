const { User } = require('../models'); 
const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcrypt');
const generateToken = require('../helpers/jwt');

class UserController{

    static register(req, res){
        const { first_name, last_name, email, password } = req.body;

        User.create({
            first_name, last_name, email, password
        })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            console.log(err);
            if(err.name === 'SequelizeValidationError'){
                res.status(400).json({
                    message: err.message.split(',\n').join(' ')
                })
            }
            res.status(500).json({
                message: err.message || 'Internal Server Error'
            });
        })
    }

    static login(req, res){
        const { email, password } = req.body;
        const errorMsg = { status: 400, message: 'Invalid Email / Password!'};

        User.findOne({
            where: { email }
        })
        .then(user => {
            if(!user || !bcrypt.compareSync(password, user.password)){
                throw errorMsg;
            } 
            return user
        })
        .then(user => {
            const access_token = generateToken(user);
            res.status(200).json({ access_token });
        })
        .catch(err => {
            console.log(err);
            if(err.status){
                res.status(err.status).json({message: err.message})
            }
            res.status(500).json({
                message: err.message || 'Internal Server Error'
            });
        })
    }

    static google_sign_in(req, res){
        const CLIENT_ID = "1035908548664-6h8ieb0vhdspv8c75l6a6dnmcvfkp7gt.apps.googleusercontent.com";
        const client = new OAuth2Client(CLIENT_ID);
        const token = req.body.id_token;
        let first_name, last_name, email;

        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            email = payload['email'];
            first_name = payload['given_name'];
            last_name = payload['family_name'];

            return User.findOne({
                where: { email }
            });
        })
        .then(user => {
            if(user){
                const access_token = generateToken(user);
                res.status(200).json({ access_token });
                return;
            } else{
                return User.create({
                    first_name, last_name, email, password: `${Math.random()}`
                })
            }
        })
        .then(newUser => {
            const access_token = generateToken(newUser);
            res.status(200).json({ access_token });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'Internal Server Error'
            })
        })
    }

}

module.exports = UserController;
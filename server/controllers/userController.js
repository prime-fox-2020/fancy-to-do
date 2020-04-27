const { User } = require('../models'); 
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

}

module.exports = UserController;
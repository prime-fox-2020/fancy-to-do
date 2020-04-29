const {User} = require('../models');
const bcrypt = require('bcrypt');
const generateToken = require('../helpers/jwt');

class userController{
    static register(req, res) {
        const {email, password} = req.body;

        User.create({email, password})
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            if(err.errors[0].message) {
                let errMessage = [];
                for(let i in err.errors) {
                    errMessage.push(err.errors[i].message);
                }
                res.status(400).json({errMessage});
            }
            else res.status(500).json({errMessage: err});
        })
    }

    static login(req, res) {
        const {email, password} = req.body;

        User.findOne({where: {email}})
        .then(data => {
            if(!data || !bcrypt.compareSync(password, data.password)) res.status(400).json({errMessage: 'Invalid User/ Password'});
            else {
                const access_token = generateToken(data);
                res.status(200).json({access_token});
            }
        })
        .catch(err => {
            res.status(500).json({errMessage: err});
        })
    }
}

module.exports = userController;
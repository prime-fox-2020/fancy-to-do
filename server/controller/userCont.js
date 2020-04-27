const { User } = require('../models');
const { generateToken } = require('../helpers/getToken');
const bcrypt = require('bcryptjs')

class UserCont {

    static register(req, res) {
        const { username, email, password } = req.body
        console.log(req.body);
        User.create({ username, email, password })
            .then((data) => {
                res.status(201).json({ msg: 'User successfully created' })
            }).catch((err) => {
                let error = []
                if (err.name === "SequelizeValidationError") {
                    //Error dari validasi model
                    err.errors.forEach(el => {
                        error.push(el.message)
                    });
                    res.status(400).json(error)
                } else {
                    //Error server tidak bisa create
                    res.status(500).json({ msg: 'Internal server error' })
                }
            });
    }

    static login(req, res) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then((data) => {
                if (!data) {
                    res.status(400).json({ msg: 'Invalid Email/Password' })
                }

                if (!bcrypt.compareSync(password, data.password)) {
                    res.status(400).json({ msg: 'Invalid Email/Password' })
                } else {
                    let akses_token = generateToken(data)
                    console.log('akses_token: ', akses_token);
                    res.status(200).json({akses_token})
                }
            }).catch((err) => {
                res.status(500).json({msg: 'Internal error server'})
            });
    }
}

module.exports = UserCont;

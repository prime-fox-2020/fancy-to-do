const {User} = require('../models')
const bcrypt = require('bcryptjs')
const {generateToken} = require('../helper/jwt')

class UsersController {
    static register (req, res) {
        let {email, password} = req.body
        User.create({email, password})
        .then(data => {res.status(201).json(data)})
        .catch(err => {res.status(400).json(err)})
    }

    static login (req, res) {
        let {email, password} = req.body
        let errMsg = {status: 400, message: 'Invalid Email / Password'}
        User.findOne({where: {email}})
        .then(data => {
            if(!data || !bcrypt.compareSync(password, data.password)){throw errMsg}
            return data
        })
        .then(data => {
            const access_token = generateToken(data)
            res.status(200).json({access_token})
        })
        .catch(err => {
            if(err.status){res.status(err.status).json({message: errMsg})}
            res.status(400).json(err)
        })
    }
}

module.exports = UsersController
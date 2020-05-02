const {User} = require('../models')
const {checkPassword} = require('../helpers/bcrypt.js')
const {generateToken} = require('../helpers/jwt.js')
const googleVerification = require('../helpers/googleOauthApi.js')

class UserController {
    static showUsers(req, res, next) {
        User.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
            // res.status(500).json(err)
        })
    }

    static register(req, res, next) {
        let queryBody = req.body
        let userObj = {
            "name": queryBody.name,
            "username": queryBody.username,
            "email": queryBody.email,
            "password": queryBody.password
        }
        User.create(userObj)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
            // res.status(500).json({
            //     errors : err
            // })
        })
    }

    static login(req, res, next) {
        let email = req.body.email
        let password = req.body.password
        User.findOne({where : {email : email}})
        .then(data => {
            if (data) {
                let compare = checkPassword(password, data.password)
                if (compare) {
                    let token = generateToken({
                        id: data.id, 
                        username: data.username,
                        email: data.email
                    })
                    res.status(200).json({
                        user_token: token,
                        user_name: data.username
                    })
                } else {
                    throw {
                        msg: "Username, email atau password tidak valid!!",
                        code: 401
                    }
                }
            } else {
                throw {
                    msg: "Username, email atau password tidak valid!!",
                    code: 401
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteUser(req, res) {
        let id = req.params.id
        User.destroy({where: {id : id}})
        .then(data => {
            if (data == 1) {
                res.status(200).json({message: "data user sukses di delete"})
            } else {
                res.status(404).json({message: "data user tidak ada"})
            }
        })
        .catch(err => {
            res.send(500).json({
                errors: err
            })
        })
    }

    static googleLogin(req, res, next) {
        let google_token = req.headers.google_token;
        console.log(google_token);
        
        let email = null
        let newUser = false;
        googleVerification(google_token)
        .then(payload => {
            email = payload.email;
            // console.log(email);
            return User.findOne({where: {email}})
        })
        .then(user => {
            // console.log(user);
            if (user) {
                return user;
            } else if (!user) {
                newUser = true
                return User.create({
                    "name": user.name,
                    "username": user.username,
                    "email": email,                    
                    "password": process.env.DEFAULT_GOOGLE_PASSWORD,
                })
            }
        })
        .then(user => {
            let code = newUser ? 201 : 200;
            let token = generateToken({
                id: user.id,
                username: user.username,
                email: user.email
            })
            res.status(code).json({
                user_token: token,
                user_name: user.username
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController
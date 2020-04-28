const {User} = require('../models')
const {checkPassword} = require('../helpers/bcrypt.js')
const {generateToken} = require('../helpers/jwt.js')
class UserController {
    // static showUsers(req, res) {
    //     User.findAll()
    //     .then(data => {
    //         res.status(200).json(data)
    //     })
    //     .catch(err => {
    //         res.status(500).json(err)
    //     })
    // }

    static register(req, res) {
        let queryBody = req.body
        let userObj = {
            name: queryBody.name,
            username: queryBody.username,
            email: queryBody.email,
            password: queryBody.password
        }
        User.create(userObj)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.send(500).json({
                errors: err
            })
        })
    }

    static login(req, res) {
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
                        user_token: token
                    })
                } else {
                    res.status(401).json({
                        message: 'Tolong login dulu'
                    })
                }
            } else {
                res.status(401).json({
                    message: 'Tolong login dulu'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                errors: err
            })   
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
}

module.exports = UserController
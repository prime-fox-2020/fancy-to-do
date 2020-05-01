const jwt = require('jsonwebtoken')
const { UserTodo, User } =require('../models')

const authentication = (req, res, next) => {
    const { access_token } = req.headers
    try {
        if(access_token){
            const decoded = jwt.verify(access_token, process.env.secret_token)
            req.userId = decoded.userId
            User.findByPk(decoded.userId)
            .then(user => {
                next()
            }).catch(err => {
                throw { message: err.message || "user not found", status: 404 }
            })
        } else {
            throw { message: "token not found", status: 404 }
        }
    }
    catch(err) {
        throw { message: err.message || "authentication failed", status: 401}
    }
}

const authorization = (req, res, next) => {
    const { id } = req.params
    UserTodo.findOne({
        where: {
            TodoId: id
        }
    })
    .then(response => {
        // console.log(response)
        if(response){
            if(response.UserId === req.userId){
                next()
            } else {
                throw { message: "cannot be accessed", status: 403 }
            }
        } else {
            throw { message: 'todo not found', status: 404 }
        }
    // .then(todo => {
    //     if(todo) {
    //         if(todo.UserId === req.userId){
    //             next()
    //         } else {
    //             throw { message: "cannot be accessed", status: 403 }
    //         }
    //     } else {
    //         throw { message: 'todo not found', status: 404 }
    //     }
    }).catch(next)
}

module.exports = {
    authentication,
    authorization
}
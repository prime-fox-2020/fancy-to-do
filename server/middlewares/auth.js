const jwt = require('jsonwebtoken')
const { Todo } =require('../models')

const authentication = (req, res, next) => {
    const { access_token } = req.headers
    if(access_token){
        const decoded = jwt.verify(access_token, process.env.secret_token)
        req.userId = decoded.userId
        next()
    } else {
        throw { message: "authentication problem", status: 401 }
    }
}

const authorization = (req, res, next) => {
    const { id } = req.params
    Todo.findByPk(id)
    .then(todo => {
        if(todo) {
            if(todo.UserId === req.userId){
                next()
            } else {
                throw { message: "cannot be access", status: 403 }
            }
        } else {
            throw { message: 'todo not found', status: 404 }
        }
    }).catch(next)
}

module.exports = {
    authentication,
    authorization
}
const jwt = require('jsonwebtoken')
const { Todo } =require('../models')

const authentication = (req, res, next) => {
    const { access_token } = req.headers
    if(access_token){
        const decoded = jwt.verify(access_token, process.env.secret_token)
        req.userId = decoded.userId
        next()
    } else {
        res.status(401).json({message: "authentication problem"})
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
                res.status(403).json({message: "cannot be access"})
            }
        } else {
            res.status(404).json({message: "Todo not Found"})
        }
    }).catch(err=> {
        console.log(err)
    })
}

module.exports = {
    authentication,
    authorization
}
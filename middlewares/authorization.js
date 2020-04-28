// const jwt = require('jsonwebtoken')
// const secretKey = "kunci rahasia"
const { Todo } = require('../models')

const authorization = (req, res, next) => {
    const { id } = req.params
    const userId = req.userData.id

    Todo.findByPk(id)
    .then(todo => {
        if(!todo) {
            res.status(404).json({message: "Todo not Found"})
        } else if (todo.UserId != userId) {
            res.status(403).json({ message: "forbidden access"})
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message || "internal eror server"})
    })
}

module.exports = {
    authorization
}
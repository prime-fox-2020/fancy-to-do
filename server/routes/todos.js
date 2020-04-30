const ToDoRoute = require('express').Router()
const ToDoController = require('../controllers/todos')
const { Todo } = require('../models')

const jwt = require('jsonwebtoken')
const secretKey = 'bebas'

//Middleware functions
const authentication = (req, res, next) => {
    console.log("Authtentication checked!")
    const { access_token } = req.headers
    if (!access_token) {
        res.status(404).json({
            message: "Token not found!"
        })
    }
    try {
        const decoded = jwt.verify(access_token, secretKey)
        //Mengirim ke TodoController.list
        req.userData = decoded
        next()
    } catch (err) {
        res.status(401).json({
            message: err.message || "User not authenticate!"
        })
    }
}
const authorization = (req, res, next) => {
    console.log("Authorization checked!")
    const getId = req.params.id
    const userId = req.userData.id

    Todo.findByPk(getId)
        .then(todo => {
            if (!todo) {
                res.status(404).json({
                    message: "Todo not found!"
                })
            } else if (todo.UserId !== userId) {
                res.status(404).json({
                    message: "User doesn't have access!"
                })
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })

}



ToDoRoute.get('/', authentication ,ToDoController.list)
ToDoRoute.get('/:id', authentication ,ToDoController.find)
ToDoRoute.post('/', authentication ,ToDoController.addTodo)
ToDoRoute.put('/:id', authentication, authorization, ToDoController.updateTodo)
ToDoRoute.delete('/:id', authentication, authorization, ToDoController.deleteTodo)


module.exports = ToDoRoute
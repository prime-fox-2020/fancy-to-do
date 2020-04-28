const { Todo } =  require('../models')

class TodosController {
    static getTodos(req, res, next) {
        Todo.findAll({
            where: {
                UserId: req.userId
            },
            order:[['id', 'asc']]
        }).then(todos => {
            res.status(200).json(todos)
        }).catch(next)
    }
    static getTodo(req, res, next) {
        const { id } = req.params
        Todo.findByPk(id)
        .then(response => {
            if(response){
                const todo = response.dataValues
                res.status(200).json(todo)
            } else {
                throw { message: 'todo not found', status: 404 }
            }
        }).catch(next)
    }
    static createTodo(req, res, next) {
        const { title, description, due_date } = req.body
        Todo.create({
            title,
            description,
            status: 'not completed',
            due_date,
            UserId: req.userId
        }).then(todo => {
            res.status(201).json(todo)
        }).catch(next)
    }
    static editTodo(req, res, next) {
        const { id } = req.params
        const { title, description, due_date, status } = req.body
        Todo.update({
            title,
            description,
            status,
            due_date
        }, {
            where: { id }
        }).then(response => {
            if(response[0] === 1) {
                res.status(200).json({message: "Todo successfully updated"})
            } else {
                throw { message: 'todo not found', status: 404 }
            }
        }).catch(next)
    }
    static deleteTodo(req, res, next) {
        const { id } = req.params
        Todo.destroy({
            where: { id }
        }).then(response => {
            if(response[0] === 1) {
                res.status(200).json({message: "Todo successfully deleted"})
            } else {
                throw { message: 'todo not found', status: 404 }
            }
        }).catch(next)
    }
}

module.exports = TodosController
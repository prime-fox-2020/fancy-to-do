const { Todo } =  require('../models')

class TodosController {
    static getTodos(req, res) {
        Todo.findAll({
            order:[['id', 'asc']]
        }).then(todos => {
            res.status(200).json(todos)
        }).catch(err=>{
            console.log(err)
        })
    }
    static getTodo(req, res) {
        const { id } = req.params
        Todo.findByPk(id)
        .then(response => {
            const todo = response.dataValues
            res.status(200).json(todo)
        })
    }
    static createTodo(req, res) {
        const { title, description, due_date } = req.body
        Todo.create({
            title,
            description,
            status: 'not completed',
            due_date,
            UserId: 1
        }).then(todo => {
            res.status(201).json(todo)
        }).catch(err => {
            console.log(err)
        })
    }
    static editTodo(req, res) {
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
                res.status(404).json({message: "Todo not found"})
            }
        }).catch(err => {
            console.log(err)
        })
    }
    static deleteTodo(req, res) {
        const { id } = req.params
        Todo.destroy({
            where: { id }
        }).then(response => {
            if(response[0] === 1) {
                res.status(200).json({message: "Todo successfully deleted"})
            } else {
                res.status(404).json({message: "Todo not found"})
            }
        }).catch(err => {
            console.log(err)
        })
    }
}

module.exports = TodosController
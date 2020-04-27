const { Todo } =  require('../models')

class TodosController {
    static getTodos(req, res) {
        Todo.findAll({
            order:[['id', 'asc']]
        }).then(todos => {
            res.status(200).json(todos)
        }).catch(err=>{
            console.log(err)
            res.json({error: err})
        })
    }
    static getTodo(req, res) {
        const { id } = req.params
        Todo.findByPk(id)
        .then(response => {
            if(response){
                const todo = response.dataValues
                res.status(200).json(todo)
            } else {
                res.status(400).json({message: 'todo not found'})
            }
        }).catch(err=>{
            console.log(err)
            res.json({error: err})
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
        }).catch(err=>{
            console.log(err)
            if(err.name === 'SequelizeValidationError'){
                let errMsg = []
                err.errors.forEach(error => {
                    errMsg.push(error.message)
                })
                res.status(400).json(errMsg)
            } else {
                res.status(500).json({message: 'internal server error'})
            }
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
        }).catch(err=>{
            console.log(err)
            if(err.name === 'SequelizeValidationError'){
                let errMsg = []
                err.errors.forEach(error => {
                    errMsg.push(error.message)
                })
                res.status(400).json(errMsg)
            } else {
                res.status(500).json({message: 'internal server error'})
            }
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
        }).catch(err=>{
            console.log(err)
            res.json({error: err})
        })
    }
}

module.exports = TodosController
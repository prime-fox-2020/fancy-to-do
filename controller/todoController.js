const { Todo } = require('../models')

class TodoController {
    static findAll(req, res) {
        Todo.findAll({
            order : [
                ['id', 'asc']
            ]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch( err => {
            res.status(500).json(err)
        })
    }

    static addTodo(req, res) {
        let data = req.body
        let newTodo = {
            title : data.title,
            description : data.description,
            status : data.status,
            due_date : data.due_date
        }
        Todo.create(newTodo)
        .then( data => {
            if(!data) {
                res.status(400).json({message : 'invalid input'})
            } else {
                res.status(201).json(data)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static findByPk(req, res) {
        let id = req.params.id
        Todo.findByPk(id)
        .then(data => {
            if(!data) {
                res.status(404).json({message: `id ${id} not found`})
            } else {
                res.status(201).json(data)
            }
        })
        .catch(err => {
            res.send(500).json(err)
        })
    }

    static updateTodo(req, res) {
        let data = req.body
        let id = req.params.id

        let newTodo = {
            title : data.title,
            description : data.description,
            status : data.status,
            due_date : data.due_date
        }

        Todo.update(newTodo, {
            where : {
                id : id
            }
        })
        .then(data => {
            if(!data) {
                res.status(404).json({message: `id ${id} not found`})
            } else {
                res.status(200).json(data)
            }
        })
        .catch( err => {
            res.status(500).json(err)
        })
    }

    static deleteTodo(req, res) {
        let id = req.params.id
        Todo.destroy({
            where : {id : id}
        })
        .then( data => {
            if(!data) {
                res.status(404).json({message: `id ${id} not found`})
            } else {
                res.status(200).json(data)
            }
        })
        .catch( err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController
const { Todo } = require('../models');

class TodoController {
    static getAll (req, res) {
        Todo.findAll()
        .then(data => {
            res.status(200).json({
                todos: data
            })
        })
        .catch(err => {
            res.status(500).json({ error: `Server error` })
        })
    }

    static getById (req, res) {
        let { id } = req.params
        Todo.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: `Todos id ${id} is not found` })
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            res.status(500).json({ error: `Server error` })
        })
    }

    static delete (req, res) {
        let { id } = req.params
        Todo.destroy({
            where : { id: id }
        })
        .then(data => {
            if (!data) {
                res.status(404).json({ error: `Todos id ${id} is not found` })
            } else {
                res.status(200).json({ message: `Todos id ${id} is deleted` })
            }
        })
        .catch(err => {
            res.status(500).json({ error: `Server error` })
        })
    }

    static create (req, res) {
        let { title, description, status, due_date } = req.body
        Todo.create({
            title: title,
            description: description,
            status: status,
            due_date: due_date
        })
        .then(data => {
            res.status(201).json({ message: `A todo has been created` })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        }) // kurang validasi res.status(400).json({ error: `Invalid input` })
    }

    static edit (req, res) {
        let { id } = req.params
        let { title, description, status, due_date } = req.body
        Todo.update({
            title: title,
            description: description,
            status: status,
            due_date: due_date
        },{
            where: {
                id: id
            }
        })
        .then(data => {
            if (!data) {
                res.status(404).json({ error: `Todos id ${id} is not found` })
            } else {
                res.status(200).json({ message: `Todo ${id} has been updated` })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        }) // kurang validasi res.status(400).json({ error: `Invalid input` })
    }
}

module.exports = TodoController
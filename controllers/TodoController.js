const {Todo} = require('../models');

class TodoController {
    static displayAll(req, res) {
        Todo.findAll({
            attributes: ["id", "title", "description", "status", "due_date"]
        })
        .then(todoList => res.status(200).json(todoList))
        .catch(err => res.status(500).json(err));
    }

    static displayOne(req, res) {
        const id = req.params.id;
        Todo.findByPk(id, {
            attributes: ["id", "title", "description", "status", "due_date"]
        })
        .then(todo => res.status(200).json(todo))
        .catch(err => res.status(500).json(err));
    }

    static add(req, res) {
        const todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.create(todo)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json(err));
    }

    static update(req, res) {
        const id = req.params.id;
        const todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(todo, {
            where: {id: id}
        })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err));
    }

    static delete(req, res) {
        const id = req.params.id;
        Todo.destroy({where: {id: id}})
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err));
    }
}

module.exports = TodoController;
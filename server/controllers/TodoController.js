const {Todo} = require('../models');

class TodoController {
    static displayAll(req, res) {
        const id = req.userData.id;
        Todo.findAll({
            attributes: ["id", "title", "description", "status", "due_date", "UserId"],
            where: {UserId: id}
        })
        .then(todoList => res.status(200).json(todoList))
        .catch(err => res.status(500).json(err.message));
    }

    static displayOne(req, res) {
        const id = req.params.id;
        Todo.findByPk(id, {
            attributes: ["id", "title", "description", "status", "due_date", "UserId"]
        })
        .then(todo => res.status(200).json(todo))
        .catch(err => res.status(500).json(err.message));
    }

    static add(req, res, next) {
        const id = req.userData.id;
        const todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: id
        }
        Todo.create(todo)
        .then(result => res.status(201).json(todo))
        .catch(err => next(err));
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
        .then(result => {
            if (result == 1)
                res.status(200).json({message: "Succesfuly update todo list", todo});
            else
                res.status(200).json({message: "Failed update todo list"});
        })
        .catch(err => res.status(500).json(err.message));
    }

    static delete(req, res) {
        const id = req.params.id;
        Todo.destroy({where: {id: id}})
        .then(result => {
            if (result)
                res.status(200).json({message: "Succesfuly delete todo list"})
            else 
                res.status(404).json({error_code: "DATA_NOT_FOUND"})
        })
        .catch(err => res.status(500).json(err.message));
    }
}

module.exports = TodoController;
const {Todo} = require('../models');

class TodoController {
    static displayAll(req, res, next) {
        const id = req.userData.id;
        Todo.findAll({
            attributes: ["id", "title", "description", "status", "due_date", "UserId"],
            where: {UserId: id} })
        .then(todoList => res.status(200).json(todoList))
        .catch(err => next(err));
    }

    static displayOne(req, res, next) {
        const id = req.params.id;
        Todo.findByPk(id, {attributes: ["id", "title", "description", "status", "due_date", "UserId"]})
        .then(todo => res.status(200).json(todo))
        .catch(err => next(err));
    }

    static add(req, res, next) {
        const userId = req.userData.id;
        const {title, description, due_date} = req.body;
        const todo = {title, description, due_date, UserId: userId};
        Todo.create(todo)
        .then(() => res.status(201).json(todo))
        .catch(err => next(err));
    }

    static update(req, res, next) {
        const id = req.params.id;
        const {title, description, status, due_date} = req.body;
        const todo = {title, description, status, due_date};
        // const todo = {title: title, description: description, status: status, due_date: due_date};
        Todo.update(todo, {where: {id: id}})
        .then(result => {
            if (result == 1)
                res.status(200).json({message: "Successful update todo list", todo});
            else
                res.status(200).json({message: "Failed update todo list"}); })
        .catch(err => next(err));
    }

    static delete(req, res, next) {
        const id = req.params.id;
        Todo.destroy({where: {id: id}})
        .then(result => {
            if (result == 1)
                res.status(200).json({message: "Successful delete todo list"});
            else 
            next({status: 404, code: "DATA_NOT_FOUND"}); })
        .catch(err => next(err));
    }
}

module.exports = TodoController;
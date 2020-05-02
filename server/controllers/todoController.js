const { Todo } = require('../models');

class todoController {
    static findAll(req, res, next) {
        console.log(req.userData.id);
        Todo.findAll({ where: { UserId: req.userData.id } })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(err);
            })
    }

    static findByPk(req, res, next) {
        Todo.findByPk(req.params.id)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(err)
            })
    }

    static addData(req, res, next) {
        const { title, description, due_date } = req.body;
        const input = {
            title, description, due_date, UserId: req.userData.id
        }

        Todo.create(input)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(err => {
                next(err);
            })
    }

    static putData(req, res, next) {
        const { title, description, status, due_date } = req.body;
        const input = {
            title, description, status, due_date
        }
        const id = req.params.id;

        Todo.update(input, { where: { id } })
            .then(data => {
                return Todo.findByPk(id)
            })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(err);
            })
    }

    static delete(req, res, next) {
        const id = req.params.id;
        let record = null;
        Todo.findByPk(id)
            .then(data => {
                record = data;
                return Todo.destroy({ where: { id } })
            })
            .then(data => {
                res.status(200).json(record);
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = todoController;
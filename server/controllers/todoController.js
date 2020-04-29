const {Todo} = require('../models');

class TodoController{

    static create(req, res, next){
        const UserId = req.user.id;
        const { title, description, status, due_date } = req.body;

        Todo.create({
            title, description, status, due_date, UserId
        })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            console.log(err);
            if(err.name === 'SequelizeValidationError'){
                next({status: 400, message: err.message.split(',\n').join(' ')})
            } else {
                next({status: 500, message: err.message || 'Internal Server Error'})
            }
        })
    }

    static read(req, res, next){
        const UserId = req.user.id;

        Todo.findAll({
            where: { UserId },
            order: [['id', 'asc']]
        })
        .then(todo => {
            res.status(200).json(todo);
        })
        .catch(err => {
            console.log(err);
            next({status: 500, message: err.message || 'Internal Server Error'})
        })
    }

    static readById(req, res, next){
        const { id } = req.params;

        Todo.findByPk(id, {})
        .then(todo => {
            console.log(todo)
            if(!todo){
                next({status: 404, message: 'DATA_NOT_FOUND'})
            } else {
                res.status(200).json(todo)
            }
        })
        .catch(err => {
            console.log(err);
            next({status: 500, message: 'Internal Server Error'})
        })
    }

    static update(req, res, next){
        const { id } = req.params;
        const updateTodo = req.body;

        Todo.update(updateTodo, {
            where: { id }
        })
        .then(() => {
            return Todo.findByPk(id, {});
        })
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.log(err);
            if(err.name === 'SequelizeValidationError'){
                next({status: 400, message: err.message.split(',\n').join(' ')})
            } else {
                next({status: 500, message: err.message || 'Internal Server Error'})
            }
        })
    }

    static delete(req, res, next){
        const id = req.params.id;

        Todo.destroy({ where: { id } })
        .then(() => {
            return Todo.findByPk(id, {})
        })
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.log(err);
            next({status: 500, message: err.message || 'Internal Server Error'})
        })
    }

}

module.exports = TodoController;
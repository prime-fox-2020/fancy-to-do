const {Todo} = require('../models');

class TodoController{

    static create(req, res){
        let { title, description, status, due_date } = req.body;

        Todo.create({
            title, description, status, due_date 
        })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            console.log(err);
            if(err.name === 'SequelizeValidationError'){
                res.status(400).json({
                    message: err.message.split(',\n').join(' ')
                })
            } else {
                res.status(500).json({
                    message: err.message || 'Internal Server Error'
                });
            }
        })
    }

    static read(req, res){
        Todo.findAll({
            order: [['id', 'asc']]
        })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message || 'Internal Server Error'
            });
        })
    }

    static readById(req, res){
        let id = req.params.id;

        Todo.findByPk(id, {})
        .then(data => {
            if(!data){
                res.status(404).json({
                    message: 'ID is not found!'
                })
            } else {
                res.status(200).json(data);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message || 'Internal Server Error'
            });
        })
    }

    static update(req, res){
        let id = req.params.id;
        let updateTodo = req.body;

        console.log(updateTodo)
        Todo.update(updateTodo, {
            where: { id }
        })
        .then(data => {
            if(!data[0]){
                res.status(404).json({
                    message: 'ID is not found!'
                })
            } else {
                res.status(200).json(data);
            }
        })
        .catch(err => {
            console.log(err);
            if(err.name === 'SequelizeValidationError'){
                res.status(400).json({
                    message: err.message.split(',\n').join(' ')
                })
            } else {
                res.status(500).json({
                    message: err.message || 'Internal Server Error'
                });
            }
        })
    }

    static delete(req, res){
        let id = req.params.id;

        Todo.destroy({ where: { id } })
        .then(data => {
            if(data === 1){
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    message: 'ID is not found!'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message || 'Internal Server Error'
            });
        })
    }

}

module.exports = TodoController;
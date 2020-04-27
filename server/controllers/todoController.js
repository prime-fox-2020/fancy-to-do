const {Todo} = require('../models');

class TodoController{
    static create(req, res){
        console.log(req.body);
        let createTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        };

        Todo.create(createTodo)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(400).json(err);
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
            res.status(500).json(err);
        })
    }

    static readById(req, res){
        let id = req.params.id;

        Todo.findByPk(id, {})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(404).json(err);
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
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }

    static delete(req, res){
        let id = req.params.id;

        Todo.destroy({ where: { id } })
        .then(data => {
            if(data === 1){
                res.status(200).json(data);
            }
        })
        .catch(err => {
            res.status(404).json(err);
        })
    }
}

module.exports = TodoController;
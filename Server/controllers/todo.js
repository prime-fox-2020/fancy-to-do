const { Todo } = require('../models')

class TodoController{
    static findAll(req, res){
        let UserId = req.currentUserId
        Todo.findAll({
            where: {UserId}
        })
        .then(datas => {
            res.status(200).json(datas)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static add(req, res){
        let UserId = req.currentUserId
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: UserId
        }
        Todo.create(newTodo)
        .then(data => {
            if (!data) {
                res.status(400).json({message: 'Invalid input!'})
            } else {
                res.status(201).json(data)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static findByPk(req, res){
        let id = req.params.id
        Todo.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).json({message: `Todos with ID ${id}, not found`})
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static update(req, res){
        let id = req.params.id
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(newTodo, {where: {id : id}})
        .then(data => {
            if (data == 1) {
                res.status(200).json({message: 'data updated'})
            } else{
                res.status(404).json({message: `Todos with ID ${id}, not found`})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static delete(req, res){
        let id = req.params.id
        Todo.destroy({
            where : {id: id}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }
}

module.exports = TodoController
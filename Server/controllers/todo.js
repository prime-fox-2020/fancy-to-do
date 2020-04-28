const { Todo } = require('../models')
const axios = require('axios')

class TodoController{
    static findAll(req, res, next){
        let UserId = req.currentUserId
        Todo.findAll({
            where: {UserId}
        })
        .then(datas => {
            res.status(200).json(datas)
        })
        .catch(err => {
            next(err)
        })
    }

    static add(req, res, next){
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
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static findByPk(req, res, next){
        let id = req.params.id
        Todo.findByPk(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static update(req, res, next){
        let id = req.params.id
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(newTodo, {where: {id : id}})
        .then(data => {
            res.status(200).json({message: `data with ${id} updated`})
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next){
        let id = req.params.id
        Todo.destroy({
            where : {id: id}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = TodoController
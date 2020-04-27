const { Todo } = require('../models')

class TodoController {

    static addTodo(req, res){
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        })
        .then(data => {
            res.status(201).json({ Todo: data})
        })
        .catch(err => {
            let alert = []
            for (let i = 0; i < err.errors.length; i++) {
                alert.push(err.errors[i].message)           
            }
            if (alert.length > 0) {
                res.status(400).json({
                    error: alert.join(',')
                })
            }else{
                res.status(500).json({
                    error: err
                })
            }
        })
    }

    static showTodo(req, res){
        Todo.findAll()
        .then(data => {
            res.status(200).json({ Todo: data})
        })
        .catch( err => {
            res.status(500).json({ error: err })
        })
    }

    static getTodo(req, res){
        Todo.findByPk(Number(req.params.id))
        .then(data => {
            if(data){
                res.status(200).json({ Todo: data})
            }
            else{
                res.status(400).json({
                    error: 'data todo not found'
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
        })
    }

    static updateTodo(req, res){
        let todoObj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(todoObj, {
            where: {
                id: req.params.id
            }
        })
        .then( data => {
            if (data == 1) {
                res.status(200).json({ Todo: "data successfully updated" }) //
            } else {
                res.status(404).json({error: "data todo not found"})                 
            }
        })
        .catch(err => {
            let alert = []
            for (let i = 0; i < err.errors.length; i++) {
                alert.push(err.errors[i].message)           
            }
            if (alert.length > 0) {
                res.status(400).json({
                    error: alert.join(',')
                })
            }else{
                res.status(500).json({
                    error: err
                })
            }
        })
    }

    static deleteTodo(req, res){
        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
        .then( data => {
            if (data > 0) {
                res.status(200).json({ Todo: data })
            } else {
                res.status(404).json({
                    error: 'data todo not found'
                })                 
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    }

}
module.exports = TodoController;
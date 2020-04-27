const {Todo} = require('../models')

class TodosController{
    static add(req, res){
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            if(err.errors && err.errors.length > 0){
                const validationError = []
                for(let i = 0; i < err.errors.length; i++){
                    validationError.push(err.errors[i].message)
                }
                res.status(400).json({'validation errors' : validationError.join(', ')})
            } else {
                res.status(500)
            }
        })
    }

    static read(req, res){
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500)
        })
    }

    static findOne(req, res){
        Todo.findOne({where: {id: req.params.id}})
        .then(data => {
            if(data) res.status(200).json(data)
            else res.status(404).json({ message : 'error not found'})
        })
        .catch(err => {
            res.send({message: '404 Error - Not Found'})
        })
    }

    static update(req, res){
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date 
        }
        Todo.update(obj, {
            where: { id: req.params.id }
        })
        .then(data => {
            if(data[0] === 1){
                res.status(200).json(obj)
            } else if(data[0] === 0){
                res.status(200).json({message : 'error not found'})
            }
        })
        .catch(err => {
            if(err.errors && err.errors.length > 0){
                const validationError = []
                for(let i = 0; i < err.errors.length; i++){
                    validationError.push(err.errors[i].message)
                }
                res.status(400).json({'validation errors' : validationError.join(', ')})
            } else {
                res.status(500)
            }
        })
    }

    static delete(req, res){
        Todo.destroy({
            where: { id: req.params.id }
        })
        .then(data => {
            if(data === 1){
                res.status(200).json(arguments['0'].body)
            } else if(data === 0) {
                res.status(404).json({message : 'error not found'})
            }
        })
        .catch(err => {
            res.status(500)
        })
    }
}

module.exports = TodosController
const {Todo} = require('../models')
const {validationError} = require('../helpers/validationError')

class TodosController{
    static add(req, res){
        const { title, description, status, due_date } = req.body
        Todo.create( {title, description, status, due_date} )
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            if(err.errors){
                const msg = validationError(err)
                res.status(400).json({'validation errors' : msg})
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
        const { title, description, status, due_date } = req.body

        Todo.update({ title, description, status, due_date }, {
            where: { id: req.params.id }
        })
        .then(data => {
            if(data[0] === 1){
                res.status(200).json({ title, description, status, due_date })
            } else if(data[0] === 0){
                res.status(200).json({message : 'error not found'})
            }
        })
        .catch(err => {
            if(err.errors){
                const msg = validationError(err)
                res.status(400).json({'validation errors' : msg})
            } else {
                res.status(500)
            }
        })
    }

    static delete(req, res){
        let dataObj
        Todo.findOne({where: {id: req.params.id}})
        .then(data => {
            if(data){
                dataObj = data
                return Todo.destroy({
                    where: { id: req.params.id }
                })
            } else {
                res.status(404).json({ message : 'error not found'})  
            } 
        })
        .then( () => {
            res.status(200).json(dataObj)
        })
        .catch(err => {
            res.status(500)
        })
    }
}

module.exports = TodosController
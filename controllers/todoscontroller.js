const {Todo} = require('../models')

class TodosController {
    static show (req, res) {
        Todo.findAll()
        .then(data => {res.status(200).json(data)})
        .catch(err => {res.status(404).json({message: 'data not found'})})
    }

    static add (req, res) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.create(obj)
        .then(data => {res.status(201).json(data)})
        .catch(err => {res.status(500).json(err)})
    }

    static update (req, res) {
        let id = req.params.id
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(obj, {where: {id: id}})
        .then(data => {
            if(data == 1){
                res.status(200).json({message: 'data successfully updated'})
            } else {
                res.status(404).json({message: 'data not found'})
            }
        })
        .catch(err => {console.log(err)})
    }

    static delete (req, res) {
        let id = req.params.id
        Todo.destroy({where: {id: id}})
        .then(data => {res.status(200).json(data)})
        .catch(err => {console.log(err)})
    }
}

module.exports = TodosController
const {Todo} = require('../models')

class TodoController {
    static findAll(req, res) {
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.send(500).json({
                errors: err.message
            })
        })
    }

    static create(req, res) {
        let userId = req.userDataId        
        let todoObj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: userId
        }
        console.log(todoObj);
        
        Todo.create(todoObj)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: 'internal server error'
            })
        })
    }

    static findById(req, res) {
        let id = req.params.id
        Todo.findByPk(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.send(400).json(err)
        })
    }
    
    static update(req, res) {
        let userId = req.userDataId        
        let queryBody = req.body
        let todoObj = {
            title: queryBody.title,
            description: queryBody.description,
            status: queryBody.status,
            due_date: queryBody.due_date,
            UserId: userId

        }
        let id = req.params.id
        Todo.update(todoObj, {where: {id: id}})
        .then(data => {
            if (data == 1) {
                res.status(201).json({message: "data sukses di update"})
            } else {
                res.status(404).json({message: "data tidak ada"})
            }
        })
        .catch(err => {
            res.send(500).json(err)
        })
    }

    static delete(req, res) {
        let id = req.params.id
        Todo.destroy({where: {id : id}})
        .then(data => {
            if (data == 1) {
                res.status(200).json({message: "data sukses di delete"})
            } else {
                res.status(404).json({message: "data tidak ada"})
            }
        })
        .catch(err => {
            res.send(500).json(err)
        })
    }
}

module.exports = TodoController
const {Todo} = require('../models')

class TodoController {
    static findAll(req, res, next) {
        let userId = req.userDataId        
        Todo.findAll({where: {"UserId": userId}, order: [["id", "DESC"]] })
        .then(data => {
            if (userId) {
                res.status(200).json(data)
            } else {
                throw {
                    msg: "Tolong login dulu",
                    code: 401
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static create(req, res, next) {
        let userId = req.userDataId        
        let todoObj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: userId
        }        
        Todo.create(todoObj)
        .then(data => {            
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static findById(req, res) {
        let userId = req.userDataId        
        let id = req.params.id
        Todo.findByPk(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.send(400).json(err)
        })
    }
    
    static update(req, res, next) {
        let id = req.params.id      
        let queryBody = req.body
        let updatedTodo = {
            title: queryBody.title,
            description: queryBody.description,
            status: queryBody.status,
            due_date: queryBody.due_date
        }
        Todo.update(updatedTodo, {where: {id: id}})
        .then(data => {
            res.status(201).json({
                message: `Sukses edit Todo dengan title: ${req.body.title}`,
                todo: updatedTodo
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res) {
        let id = req.params.id
        Todo.destroy({where: {id : id}})
        .then(data => {
            if (data == 1) {
                res.status(200).json({message: "Sukses menghapus todo"})
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
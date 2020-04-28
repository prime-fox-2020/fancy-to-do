const { Todo } = require('../models')

class TodoController {
    static findAll(req, res, next) {

        const dataUserId = req.userData.id

        Todo.findAll({
            where : {dataUserId}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch( err => {
            //res.status(500).json(err)
            next(err)
        })
    }

    static addTodo(req, res, next) {
        let data = req.body
        let newTodo = {
            title : data.title,
            description : data.description,
            status : data.status,
            due_date : data.due_date,
            UserId : req.userData.id
        }
        Todo.create(newTodo)
        .then( data => {
            if(!data) {
                res.status(400).json({message : 'invalid input'})
            } else {
                res.status(201).json(data)
            }
        })
        .catch(err => {
            //res.status(500).json(err)
            next(err)
        })
    }

    static findByPk(req, res, next) {
        let id = req.params.id
        Todo.findByPk(id)
        .then(data => {
            if(!data) {
                next({name: `data not found`})
            } else {
                res.status(201).json(data)
            }
        })
        .catch(err => {
            //res.send(500).json(err)
            next(err)
        })
    }

    static updateTodo(req, res, next) {
        let data = req.body
        let id = req.params.id

        let newTodo = {
            title : data.title,
            description : data.description,
            status : data.status,
            due_date : data.due_date
        }

        Todo.update(newTodo, {
            where : {
                id : id
            }
        })
        .then(data => {
            if(!data) {
                next({name: `data not found`})
            } else {
                res.status(200).json(data)
            }
        })
        .catch( err => {
            //res.status(500).json(err)
            next(err)
        })
    }

    static deleteTodo(req, res, next) {
        let id = req.params.id
        Todo.destroy({
            where : {
                id : id, 
                UserId : req.userData.id
            }
        })
        .then( data => {
            if(!data) {
                //res.status(404).json({message: `data not found`})
                next({name: `data not found`})
            } else {
                res.status(200).json(data)
            }
        })
        .catch( err => {
            //res.status(500).json(err)
            next(err)
        })
    }
}

module.exports = TodoController
const { todo } = require('../models')

class toDoController {
    static show(req, res, next) {
        todo.findAll({
            where: {
                UserId: req.userDataValid.id
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next({name: "Internal Server Error"})
            })
    }

    static showOne(req, res, next) {
        todo.findByPk(req.params.id)
            .then(data => {
                if(!data){
                    next({name: "DATA_NOT_FOUND"})
                }else{
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next({name: "Internal Server Error"})
            })
    }

    static addTodo(req, res, next) {
        let objTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userDataValid.id
        }

        todo.create(objTodo)
            .then(data => {
                res.status(201).json({ message: "data telah dibuat" })
            }).catch(err => {
                console.log(err)
                next({name: "Internal Server Error"})
            })


    }

    static editTodo(req, res, next) {
        let objTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        todo.update(objTodo, {
            where: {
                id: Number(req.params.id)
            }
        }).then(data => {
            if (data == 1) {
                res.status(200).json({ message: "data telah diperbaharui" })
            } else {
               next({name: "SequelizeValidationError"})
            }
        }).catch(err => {
            next({name: "Internal Server Error"})
        })
    }

    static deleteTodo(req, res, next) {
        todo.destroy({
            where: {
                id: req.params.id
            }
        }).then(data => {
            if (data == 1) {
                res.status(200).json({ message: "data telah dihapus" })
            } else {
                next({name: "DATA_NOT_FOUND" })
            }
        }).catch(err => {
            next({name: "Internal Server Error"})
        })
    }
}

module.exports = toDoController
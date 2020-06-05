const { Todo, User } = require('../models')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

class ToDoController {
    static allList(req, res) {
        //Menerima dr middleware
        Todo.findAll()
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(err => {
                next(err)
            })
    }
    static list(req, res) {
        //Menerima dr middleware
        const getId = req.userData.id
        Todo.findAll({
            include: [
                User
            ],
            where: {
                UserId: getId
            }
        })
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(err => {
                nx(err)
            })
    }
    static find(req, res, next) {
        let getId = req.params.id

        Todo.findOne({
            where: {
                id: getId
            }
        })
            .then(todo => {
                if (!todo) {
                    next({
                        name: "Not_Found"
                    })
                } else {
                    res.status(200).json(todo)
                }
            })
            .catch(err => {
                next(err)
                res.status(500).json(err)
            })
    }
    static addTodo(req, res, next) {
        let form = req.body
        let userId = req.userData.id

        Todo.create({
            title: form.title,
            description: form.description,
            status: form.status,
            due_date: form.due_date,
            UserId: userId
        })
            .then(todo => {
                // let mailMessage = {
                //     to : 'vincentguizot@yahoo.com',
                //     from : 'vincentguizot@yahoo.com',
                //     subject : todo.title,
                //     text : todo.description,
                //     html : '<strong> [] </strong>'
                // }

                // sgMail.send(mailMessage)
                
                res.status(201).json(todo)
            })
            .catch(err => {
                next(err)
            })
    }
    static updateTodo(req, res, next) {
        let getId = req.params.id
        let form = req.body
        Todo.update({
            title: form.title,
            description: form.description,
            status: form.status,
            due_date: form.due_date
        }, {
            where: {
                id: getId
            }
        })
            .then(todo => {
                if (!todo) {
                    next({
                        name: "Not_Found"
                    })
                } else {
                    res.status(200).json(todo)
                }
                res.status(201).json(todo)
            })
            .catch(err => {
                next(err)
            })
    }
    static deleteTodo(req, res, next) {
        let getId = req.params.id
        Todo.destroy({
            where: {
                id: getId
            }
        })
            .then(todo => {
                if (!todo) {
                    next({
                        name: "Not_Found"
                    })
                } else {
                    res.status(200).json(todo)
                }
                res.status(200).json(todo)
            })
            .catch(err => {
                next(err)
            })
    }
}




module.exports = ToDoController

/**
 * HTTP Status Code
 * 200 : Ok
 * 201 : Created
 * 400 : Bad Request
 * 401 : Not Authorized
 * 403 : Forbidden
 * 404 : Not Found
 * 500 : Internal Server Error
 *
 */
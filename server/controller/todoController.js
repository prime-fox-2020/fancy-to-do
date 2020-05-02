const fs = require('fs')
const { Todo } = require('../models')
const { createEvent, authorize, } = require('../helpers/googleapis')

class TodoController {
    static findAll(req, res, next) {

        const dataUserId = req.userData.id

        Todo.findAll({
            where : {UserId : dataUserId}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    static addTodo(req, res, next) {

        fs.readFile("credentials.json", (err, content) => {
            if (err) next(err)
            
            let data = req.body

            let calendarData = {
                title : data.title,
                description : data.description,
                status : data.status,
                due_date : data.due_date,
                email : req.userData.email,
            }
    
            let newTodo = {
                title : data.title,
                description : data.description,
                status : data.status,
                due_date : data.due_date,
                UserId : req.userData.id,
                createdAt: new Date(),
                updatedAtd : new Date()
            }
            Todo.create(newTodo)
                .then( data => {
                    authorize(JSON.parse(content), res, calendarData, createEvent);
                })
                .catch(error => {
                    console.log(error)
                    next(error)
                })
          });

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
            due_date : new Date(data.due_date),

        }

        Todo.update(newTodo, {
            where : {
                id : id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch( err => {
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
                next({name: `data not found`})
            } else {
                res.status(200).json(data)
            }
        })
        .catch( err => {
            next(err)
        })
    }
}

module.exports = TodoController
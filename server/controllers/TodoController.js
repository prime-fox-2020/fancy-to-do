const { Todo } = require('../models')

class TodoController {

    static addTodo(req, res){
        const idTokenVeryfied = req.userData.id

        // res.status(200).json(req.body)

        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || 'belum berhasil',
            due_date: req.body.due_date,
            UserId: idTokenVeryfied                 // linked wit author
        })
        .then(response => {
            if (response) {
                res.status(201).json(response)
            } else {
                res.status(400).json({ message: 'Bad Request - unable created data todo' })
            }
        })
        .catch(err => {
            let msg = []
            for (let i = 0; i<err.errors.length;i++){
                msg.push(err.errors[i].message)
            }
            next({name: "SequelizeValidationError", message : msg})
        })
    }

    static showTodo(req, res){
        const idTokenVeryfied = req.userData.id

        Todo.findAll({
            order: ['id'],
            where: { 
                UserId: idTokenVeryfied
            }
        })
        .then(response => {
            res.status(200).json( response )
        })
        .catch( err => {
            next(err)
        })
    }

    static getTodo(req, res){                        // not yet link atoken
        Todo.findByPk(Number(req.params.id))
        .then(response => {
            if(response){
                res.status(200).json(response)
            }
            else{
                res.status(400).json({ message: 'Bad Request - unable find data todo' })
            }
        })
        .catch( err => {
            next(err)
        })
    }

    static updateTodo(req, res){                    
        // const idTokenVeryfied = req.userData.id

        let todoObj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
            // UserId: idTokenVeryfied                 // already linked addTodo
        }
        Todo.update(todoObj, {
            where: {
                id: req.params.id
            }
        })
        .then( response => {
            if (response == 1) {
                res.status(200).json({ message: "Update selected todo successfully" }) //
                // res.status(200).json(response) //
            } else {
                res.status(400).json({ message: 'Bad Request - unable updated data todo' })
            }
        })
        .catch(err => {
            let msg = []
            for (let i = 0; i<err.errors.length;i++){
                msg.push(err.errors[i].message)
            }
            next({name: "SequelizeValidationError", message : msg})
        })
    }

    static deleteTodo(req, res){
        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
        .then( response => {
            if (response > 0) { // response = 1
                res.status(200).json({ message: 'Delete selected todo successfully' })
            } else {
                res.status(404).json({ message: 'Delete data todo not found' })    
            }
        })
        .catch(err => {
            next(err)
        })
    }

}
module.exports = TodoController;
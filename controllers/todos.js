const { Todo } = require('../models')

class ToDoController {
    static list(req,res){
        Todo.findAll()
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.send(err)
        })
    }
    static find(req,res){
        let getId = req.params.id
        
        Todo.findAll({
            where : {
                id : getId
            }
        })
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.send(err)
        })
    }
    static addTodo(req,res){
        let form = req.body
        Todo.create({
            title : form.title,
            description : form.description,
            status : form.status,
            due_date : form.due_date
        })
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static updateTodo(req,res){
        let getId = req.params.id
        let form = req.body
        Todo.update({
            title : form.title,
            description : form.description,
            status : form.status,
            due_date : form.due_date
        },{
            where : {
                id : getId
            }
        })
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static deleteTodo(req,res){
        let getId =  req.params.id
        Todo.destroy({
            where : {
                id : getId
            }
        })
        .then(todo =>{
            res.status(200).json(todo)   
        })
        .catch(err =>{
            res.status(500).json(err)
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
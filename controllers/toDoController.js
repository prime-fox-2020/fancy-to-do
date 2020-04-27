const ToDo = require('../models').FancyToDo

class ToDoController{
    static readTodo(req,res){
        ToDo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static readTodoById(req,res){
        ToDo.findOne({
            where : { id: req.params.id }
        })
        .then(data=> {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static createTodo(req,res){
        ToDo.create({
            title:req.body.title,
            description: req.body.description,
            status: 'berhasil di-create',
            due_date: new Date()
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static updateTodo(req,res){
        ToDo.update({
            title:req.body.title,
            description: req.body.description,
            status: 'berhasil di-update',
            due_date: new Date()
        }, { where : { id : req.params.id }})
        .then(data => {
            res.status(200).json({message: 'data succesfully updated'})
        })
        .catch( err => {
            res.status(404).json({message: 'data not found'})
        })
    }

    static deleteTodo(req,res){
        ToDo.destroy({
            where: { id:req.params.id }
        })
        .then(data => {
            res.status(200).json({message: 'data succesfully deleted'})
        })
        .catch(err => {
            console.log(err);
        })
    }
 }

 module.exports =  ToDoController
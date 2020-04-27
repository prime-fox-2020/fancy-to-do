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
            if(data == null){
                res.status(404).json({message : 'error, data not found'})
            }else{
                res.status(200).json(data)
            }
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
            if(err.name == 'SequelizeValidationError'){
                let message = err.errors[0].message
                res.status(400).json({ message })
            }else{
                res.status(500).json(err)
            }
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
            // console.log(data);
            if(data[0] == 1){
                res.status(200).json({message: 'data succesfully updated'})
            }else{
                res.status(404).json({message: 'error, data not found'})
            }
        })
        .catch(err => {
            // console.log(err);
            if(err.name == 'SequelizeValidationError'){
                let message = err.errors[0].message
                res.status(400).json({ message })
            }else{
                res.status(500).json(err)
            }
        })
    }

    static deleteTodo(req,res){
        ToDo.destroy({
            where: { id : req.params.id }
        })
        .then(data => {
            // console.log(data);
            if(data == 1){
                res.status(200).json({message: 'data succesfully deleted'})
            }else{
                res.status(404).json({message: 'error, data not found'})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
 }

 module.exports =  ToDoController
const TodoModel = require('../models').Todo

class Todos{
    static getTodos(req, res){
        TodoModel.findAll()
        .then( data=>{
            res.status(200).json(data)
        })
        .catch( err=>{
            res.status(500)
        })
    }

    static postTodos(req, res){
        TodoModel.create({
            title: req.body.title,
            desc: req.body.desc,
            status: false,
            due_date: req.body.due_date
        })
        .then( data=>{
            res.status(201).json(data)
            console.log(req.body)
        })
        .catch( err=>{
            res.status(500)
        })
    }

    static getTodosId(req, res){
        TodoModel.findAll({
            where: {id: req.params.id}
        })
        .then( data=>{
            res.status(200).json(data)
        })
        .catch( err=>{
            res.status(404).json(err)
        })
    }

    static todosUp(req, res){
        TodoModel.update({
            title: req.body.title,
            desc: req.body.desc,
            status: req.body.status,
            due_date: req.body.due_date
        },{
            where: {id: req.params.id}
        })
        .then( data=>{
            res.status(201).json(data)
        })
        .catch( err=>{
            res.status(500)
        })
    }

    static todosDel(req, res){
        TodoModel.destroy({
            where: {id: req.params.id}
        })
        .then( data=>{
            res.status(200).json(data)
        })
        .catch( err=>{
            res.status(404).json(err)
        })
    }

}

module.exports = Todos
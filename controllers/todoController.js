const {Todo} = require('../models')

class TodoController {
    static show(req,res){
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static addTodo(req,res){
        let newData = {
            title : req.body.title,
            description : req.body.description,
            status : false,
            due_date : req.body.due_date
        }
        Todo.create(newData)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            let error = []
            for (let i = 0; i<err.errors.length;i++){
                error.push(err.errors[i].message)
            }
            res.status(400).json(error)
        })
    }

    static showIndividual(req,res){
        let id = Number(req.params.id)
        Todo.findByPk(id)
        .then(data => {
            if (data){
                res.status(200).json(data)
            } else {
                res.status(404).json({ msg : `Data Not Found`})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static editTodo(req,res){
        let newData = {
            title : req.body.title,
            description : req.body.description,
            status : false,
            due_date : req.body.due_date
        }
        Todo.update(newData,{
            where : {id: req.params.id}
        })
        .then(data => {
            if (data > 0){
                res.status(200).json({msg : `Data successfully updated`})
            } else {
                res.status(404).json({msg: `Data Not Found`})
            }
        })
        .catch(err => {
            let error = []
            for (let i = 0; i<err.errors.length;i++){
                error.push(err.errors[i].message)
            }
            res.status(500).json(error)
        })
    }

    static deleteTodo(req,res){
        let id = req.params.id
        Todo.destroy({
            where : {id : id}
        })
        .then(data => {
            if(data>0){
                res.status(200).json({msg : `Data has been deleted`})
            } else {
                res.status(404).json({msg : `Data not found`})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController
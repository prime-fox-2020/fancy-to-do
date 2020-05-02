const {Todo} = require('../models')

class TodoController {
    static show(req,res){
        const userDataId = req.userData.id
        Todo.findAll({
            where : {UserId : userDataId}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static addTodo(req, res, next){
        const userDataId = req.userData.id
        let newData = {
            title : req.body.title,
            description : req.body.description,
            status : false,
            due_date : req.body.due_date,
            UserId : userDataId
        }
        Todo.create(newData)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static showIndividual(req, res, next){
        let id = Number(req.params.id)
        Todo.findByPk(id)
        .then(data => {
            if (data){
                res.status(200).json(data)
            } else {
                next({ name:`Data Not Found` })
            }
        })
        .catch(err => {
            next(err)
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
            if (data == 1){
                res.status(200).json({msg : `Data successfully updated`})
            } else {
                next({ name : `Data Not Found` })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTodo(req,res){
        let id = req.params.id
        Todo.destroy({
            where : {id : id}
        })
        .then(data => {
            if(data == 1){
                res.status(200).json({msg : `Data has been deleted`})
            } else {
                next({ name : `Data Not Found` })
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController
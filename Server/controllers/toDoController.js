const ToDo = require('../models').FancyToDo
const axios = require('axios')

class ToDoController{
    static readTodo(req, res, next){
        // console.log(req.userData);
        const userDataId = req.userData.id

        ToDo.findAll({
            where: { UserId: userDataId },
            order: [['id', 'ASC']]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static readTodoById(req, res, next){
        // console.log(req.params);
        // const userDataId = req.userData.id
        ToDo.findOne({
            where : { id: req.params.id}
        })
        .then(data=> {
            if(!data){
                next({name: 'DATA_NOT_FOUND'})
            }else{
                res.status(200).json(data)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static createTodo(req,res,next){
        const userDataId = req.userData.id
        ToDo.create({
            title:req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(),
            UserId: userDataId
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static updateTodo(req, res, next){
        const userDataId = req.userData.id
        ToDo.update({
            title:req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(),
            UserId: userDataId
        }, { where : { id : req.params.id}})
        .then(data => {
            // console.log(data);
            if(data[0] === 1){
                res.status(200).json({message: 'data succesfully updated'})
            }else{
                next({name: 'DATA_NOT_FOUND'})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTodo(req,res,next){
        ToDo.destroy({
            where: { id : req.params.id }
        })
        .then(data => {
            // console.log(data);
            if(data === 1){
                res.status(200).json({message: 'data succesfully deleted'})
            }else{
                next({name: 'DATA_NOT_FOUND'})
            }
        })
        .catch(err => {
            next(err)
        })
    }
 }

 module.exports =  ToDoController
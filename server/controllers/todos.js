const {Todo} = require('../models/index')

class Controller{
    
    static findAll(req,res){
        Todo.findAll({})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json('internal server error')
        })
    }

    static findAllMyTodos(req,res){
        const username = req.userData.username
        console.log(username)
        Todo.findAll({where : {username : username}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json('internal server error')
        })
    }

    static findId(req,res){
        const id = req.params.id
        Todo.findAll({where: {id : id}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json('internal server error')
        })
    }

    static add(req,res){
        const body = {
            username:req.body.username,
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:req.body.due_date
        }

        Todo.create(body)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            res.status(400).json({message: `internal server error`})
        })
    }

    static update(req,res,next){
        const id = req.params.id
        const body = req.body
            body.username = body.username,
            body.title = req.body.title,
            body.description = req.body.description,
            body.status = req.body.status,
            body.due_date = req.body.due_date

        Todo.update(body, {where : {id : id}})
        .then(data=>{
            if(data == 1){
                res.status(200).json({message: `data updated`})
            }else{
                res.status(400).json({message: `data not found`})
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static delete(req,res){
        const id = req.params.id

        Todo.destroy({where: {id : id}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    




}


module.exports = Controller
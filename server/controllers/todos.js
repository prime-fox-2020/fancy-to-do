const {Todo} = require('../models/index')
const secretKey = "KeyBoardWarrior"
const jwt = require('jsonwebtoken')

class Controller{
    
    static findAll(req,res,next){
        Todo.findAll({})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }


    static findAllMyTodos(req,res,next){
        const access_token = req.headers.access_token
        const decoded = jwt.verify(access_token,secretKey)
        const username = decoded.username
        Todo.findAll({where : {username : username}})
        .then(data=>{
            console.log(data)
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static findId(req,res,next){
        const id = req.params.id
        Todo.findAll({where: {id : id}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static add(req,res,next){
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
            next(err)
        })
    }

    static update(req,res,next){
        console.log(req.body)
        
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

    static delete(req,res,next){
        
        const id = req.params.id
        console.log(id)
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
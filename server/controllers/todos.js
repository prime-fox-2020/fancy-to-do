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

    static update(req,res){
        const id = req.params.id
        const username = req.userData.username
        const body = req.body
        let status = true
            body.username = body.username,
            body.title = req.body.title,
            body.description = req.body.description,
            body.status = req.body.status,
            body.due_date = req.body.due_date

        Todo.findByPk(id)
        .then((data)=>{
            if(username.toLowerCase().slice(0,5) == 'admin'){
                return Todo.update(body, {where : {id : id}})
            }
            else if(username !== data.username){
                status = false
                res.status(501).json('un - authorized only for admin or user only')
            }
            else if(username == data.username){
                return Todo.update(body, {where : {id : id}})
            }
        })
        .then(data=>{
            if(data == 1){
                res.status(200).json({message: `data updated`})
            }else{
                res.status(400).json({message: `data not found`})
            }
        })
        .catch(err=>{
            res.status(400).json({message: `internal server error`})
        })
    }

    static delete(req,res){
        const id = req.params.id
        const username = req.userData.username
        let status = true
        Todo.findByPk(id)
        .then(data=>{
            if(username.toLowerCase().slice(0,5) == 'admin'){
                return Todo.destroy({where: {id : id}})
            }
            else if(username !== data.username){
                status = false
                res.status(501).json('un - authorized only for admin or user only')
            }
            else if(username == data.username){
                return Todo.destroy({where: {id : id}})
            }
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json({message: `data not found`})
        })
    }

    




}


module.exports = Controller
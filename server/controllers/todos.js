const {Todo} = require('../models/index')

class Controller{
    
    static findAll(req,res){
        Todo.findAll({})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json('data tidak ada')
        })
    }

    static findId(req,res){
        const id = req.params.id
        Todo.findAll({where: {id : id}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json('data tidak ada')
        })
    }

    static add(req,res){
        const body = {
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
            res.status(200).json({message: `data not found`})
        })
    }

    static update(req,res){
        const id = req.params.id
        const body = {
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:req.body.due_date
        }

        Todo.update(body, {where : {id : id}})
        .then(data=>{
            if(data == 1){
                res.status(200).json({message: `data updated`})
            }else{
                res.status(400).json({message: `data not found`})
            }
            
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static delete(req,res){
        const id = req.params.id
        console.log(id)
        Todo.destroy({where: {id : id}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(200).json({message: `data not found`})
        })
    }

    




}


module.exports = Controller
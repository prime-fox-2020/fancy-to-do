const {todo} = require('../models')

class toDoController{
    static show(req, res){
        todo.findAll()
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }

    static showOne(req, res){
        todo.findByPk(req.params.id)
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(404).json({message: "data tidak ditemukan"})
        })
    }

    static addTodo(req, res){
        let objTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        for(let key in objTodo){
            if(!objTodo[key]){
                 throw res.status(400).json({message: `data ${key} belum diisi`})
            }
        }
        todo.create(objTodo)
        .then(data =>{
            res.status(201).json(data)
        }).catch(err =>{
            res.status(500).json(err)
        })


    }

    static editTodo(req, res){
        let objTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        todo.update(objTodo, {
            where: {
                id: Number(req.params.id)
            }
        }).then(data =>{
            if(data == 1 ){
                res.status(200).json({message: "data telah diperbaharui"})
            } else{
                res.status(404).json({message: "data tidak ditemukan"})
            }
        }).catch(err =>{
            res.status(500).json(err)
        })
    }

    static deleteTodo(req, res){
        todo.destroy({where: {
            id: req.params.id
        }}).then(data =>{
            if(data == 1 ){
                res.status(200).json({message: "data telah dihapus"})
            } else{
                res.status(404).json({message: "data tidak ditemukan"})
            }
        }).catch(err =>{
            res.status(500).json(err)
        })
    }
}

module.exports = toDoController
const ToDo = require('../models').FancyToDo

class ToDoController{
    static readTodo(req,res){
        // console.log(req.userData);
        const userDataId = req.userData.id
        ToDo.findAll({
            where: { UserId: userDataId }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static readTodoById(req,res){
        // console.log(req.params);
        const userDataId = req.userData.id
        ToDo.findOne({
            where : { id: req.params.id , 
                      UserId: userDataId}
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
        const userDataId = req.userData.id
        ToDo.create({
            title:req.body.title,
            description: req.body.description,
            status: 'berhasil di-create',
            due_date: new Date(),
            UserId: userDataId
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            let message = []
            if(err.name == 'SequelizeValidationError'){
                for (let i = 0; i < err.errors.length; i++) {
                    message.push(err.errors[i].message)
                }
                res.status(400).json({ message })
            }else{
                res.status(500).json(err)
            }
        })
    }

    static updateTodo(req,res){
        const userDataId = req.userData.id
        ToDo.update({
            title:req.body.title,
            description: req.body.description,
            status: 'berhasil di-update',
            due_date: new Date(),
            UserId: userDataId
        }, { where : { id : req.params.id, 
                        UserId: userDataId }})
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
                let message = []
                for (let i = 0; i < err.errors.length; i++) {
                    message.push(err.errors[i].message)
                }
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
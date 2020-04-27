const {Todo} = require('../models')


class todoController{
    static findAll(request,respond){
        Todo.findAll()
        .then(data=>{
            respond.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    static postNew(request,respond){
        let objTodo = {
            title : request.body.title,
            description : request.body.description,
            status : request.body.status,
            due_date : request.body.due_date
        }
        Todo.create(objTodo)
        .then(data=>{
            if(!data){
                respond.status(400).json({message : 'Invalid Input!'})
            }else{
                respond.status(201).json(data)
            }
        })
        .catch(err=>{
            respond.status(500).json(err)
        })
    }
    static updateList(request,respond){
        let objTodo = {
            title : request.body.title,
            description : request.body.description,
            status : request.body.status,
            due_date : request.body.due_date
        }
        Todo.update(objTodo,{
            where : {id : Number(request.params.id)}
        })
        .then(data=>{
            respond.status(200).json(data)
        })
        .catch(err=>{
            respond.status(500).json(err)
        })
    }
    static deleteList(request,respond){
        Todo.destroy({where: {id: Number(request.params.id)}})
        .then(data=>{
            respond.status(200).json(data)
        })
        .catch(err=>{
            respond.status(500).json(err)
        })
    }
}

module.exports = todoController
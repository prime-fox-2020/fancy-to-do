const {Todo} = require('../models')


class todoController{
    static findAll(request,respond){
        Todo.findAll()
        .then(data=>{
            respond.status(200).json(data)
        })
        .catch(err => {
            respond.status(500).json(err)
        })
    }
    static findOne(request,respond){
        Todo.findOne({
            where:{id : Number(request.params.id)}
        })
        .then(data=>{
            if(data === null){
                respond.status(404).json({
                    message: 'Object Not Found!'
                })
            }else{
                respond.status(200).json(data)
            }
        })
        .catch(err=>{
            respond.status(500).json({err})
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
            let arr =[]
            console.log(err)
            for(let i = 0; i<err.errors.length;i++){
                arr.push(err.errors[i].message)
            }
            if(arr.length>0){
                respond.status(400).json({
                    error:arr.join(',')
                })
            }else{
                respond.status(500).json({
                    error:err
                })
            }
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
            if(data === 1){
                respond.status(200).json(data)
            }else{
                respond.status(404).json({
                    message: 'Object Not Found!'
                })
            }
        })
        .catch(err=>{
            let arr =[]
            for(let i = 0; i<err.errors.length;i++){
                arr.push(err.errors[i].message)
            }
            if(arr.length>0){
                respond.status(400).json({
                    error:arr.join(',')
                })
            }else{
                respond.status(500).json({
                    error:err
                })
            }
            respond.status(500).json(err)
        })
    }
    static deleteList(request,respond){
        Todo.destroy({where: {id: Number(request.params.id)}})
        .then(data=>{
            if(data === 0){
                respond.status(404).json({
                    message: 'Object Not Found!'
                })
            }else{
                respond.status(200).json(data)
            }
        })
        .catch(err=>{
            respond.status(500).json(err)
        })
    }
}

module.exports = todoController
const {Todo} = require('../models')

class TodosController{
  static addTodos(req,res){
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date 
    }
    Todo.create(newTodo)
    .then(todo=>{
      res.status(201).json({
        todo : todo,
        message : 'successfully added'
      })
    })
    .catch(err=>{
      let error = []
      for (let i = 0; i<err.errors.length;i++){
          error.push(err.errors[i].message)
      }
      res.status(500).json(error)
    })
  }

  static allTodos(req,res){
    Todo.findAll()
    .then(todo=>{
      res.status(200).json(todo)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static findTodos(req,res){
    Todo.findByPk(req.params.id)
    .then(todo=>{
      if(todo){
        res.status(200).json(todo)
      } else {
        res.status(404).json({error : 'data not found'})
      }
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static updateTodos(req,res){
    var id = req.params.id
    var objTodos = {
      title : req.body.title,
      description: req.body.description,
      status:req.body.status,
      due_date:req.body.due_date
    }
    Todo.update(objTodos, {where : {id : id}})
    .then(todo=>{
      res.status(200).json({
        todo : todo,
        message : 'successfully edited'
      })
    })
    .catch(err=>{
      let error = []
      for (let i = 0; i<err.errors.length;i++){
          error.push(err.errors[i].message)
      }
      res.status(500).json(error)
    })
  }

  static deleteTodos(req,res){
    var id = req.params.id
    Todo.destroy({where:{id:id}})
    .then(todo=>{
      res.status(200).json({
        todo : todo,
        message : 'successfully deleted'
      })
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }
}

module.exports = TodosController
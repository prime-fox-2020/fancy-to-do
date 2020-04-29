const {Todo} = require('../models')

class TodosController{
  static addTodos(req,res,next){
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId : req.userData.id
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
        next({name: "SequelizeValidationError", message : error})
    })
  }

  static allTodos(req,res,next){
    const dataUserId = req.userData.id
    Todo.findAll({
      where : {UserId: dataUserId}
    })
    .then(todos=>{
      res.status(200).json(todos)
    })
    .catch(err=>{
      next(err)
    })
  }

  static findTodos(req,res,next){
    Todo.findByPk(req.params.id)
    .then(todo=>{
      if(todo){
        res.status(200).json(todo)
      } else {
        next({ name : "ToDoNotFound" })
      }
    })
    .catch(err=>{
      next(err)
    })
  }

  static updateTodos(req,res,next){
    let newTodo = {
      title : req.body.title,
      description: req.body.description,
      status:req.body.status,
      due_date:req.body.due_date
    }
    Todo.update(newTodo, {where : {id : req.params.id}})
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
      next({name: "SequelizeValidationError", message : error})
    })
  }

  static deleteTodos(req,res){
    var id = req.params.id
    Todo.destroy({
      where: {
        id:id
      }
    })
    .then(todo=>{
      res.status(200).json({message : 'successfully deleted'})
    })
    .catch(err=>{
      next(err)
    })
  }
}

module.exports = TodosController
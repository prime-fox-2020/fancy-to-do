const {Todo, User} = require('../models')
const axios = require('axios')

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
      return Todo.findAll({
        where : {UserId: req.userData.id},
        include: [{model:User}]
      })
    })
    .then(data=>{
      let email = data[0].dataValues.User.dataValues.email
      axios({
        method:"POST",
        url:"https://simplemailsender.p.rapidapi.com/SendMails/Send",
        headers:{
            "x-rapidapi-host":"simplemailsender.p.rapidapi.com",
            "x-rapidapi-key":"4e0e3fc803mshecdbceee149660bp1f41c7jsnd56619c29ad2"
        },
        data:{
            Correo_Delivery : email,
            Mensjae : `You add new Todo's at Elvan's Fancy Todo`
        }
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
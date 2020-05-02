'use strict'
const { Todo } = require('../models')

class TodoControllers{
  
  static findAll(req, res, next){

    const userId = req.userData.id

    Todo.findAll({

      where: { UserId: userId },
      order: [['id', 'DESC']]

    })
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(err => {
        next(err)
      })

  }


  static create(req, res, next){

    const userId = req.userData.id
    const { title, description, status } = req.body
    
    Todo.create({
      title       : title,
      description : description,
      status      : status,
      due_date    : Date.now(),
      UserId      : userId
    })
      .then(result => res.status(201).json({
        todo : result,
        message: 'Todo berhasil dibuat'
      }))
      .catch(err => {
        if(err.errors){
          const obj = {}
          for(let dt of err.errors){
            obj[dt.path] = dt.message
          }
          next({name: "SequelizeValidationError", message : obj})
        } else next(err)
      })

  }

  static findId(req, res, next){
    
    const id = req.params.id

    Todo.findByPk(id)
      .then(data => {
        if(data) res.status(200).json(data)
        else next({ name : "ToDoNotFound" })
      })
      .catch(err => {
        next(err)
      })

  }

  static update(req, res, next){

    const id      = req.params.id
    const userId  = req.userData.id
    const { title, description, status } = req.body

    Todo.update({
      title       : title,
      description : description,
      status      : status,
      due_date    : Date.now(),
      UserId      : userId
    }, { where: { id } })
      .then(data => {
        if(data[0] === 1) {
          res.status(200).json({message :`sucessfully update data`})
        }
        else next({ name : "ToDoNotFound" })
      })
      .catch(err => {
        if(err.errors){
          const obj = {}
          for(let dt of err.errors){
            obj[dt.path] = dt.message
          }
          next({ name: 'SequelizeValidationError', message : obj })
        }else next(err)
      })

  }

  static delete(req, res, next){

    const id = req.params.id

    Todo.findByPk(id)
      .then(data => data.destroy())
      .then(data => {
        if(data) res.send(200).json({ message: 'successfully delete todos' })
        else next({ name : "ToDoNotFound" })
      })
      .catch(err => next(err))
  }
}


module.exports = TodoControllers
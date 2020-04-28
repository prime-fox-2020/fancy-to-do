'use strict'
const { Todo } = require('../models')

class TodoControllers{
  
  static findAll(req, res){

    const userId = req.userData.id
    console.log(userId)

    Todo.findAll({

      where: { UserId: userId }

    })
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(err => {
        res.status(500).json({ message: 'ada kesalahan pada server', detail: err })
      })

  }


  static create(req, res){

    const userId = req.userData.id
    
    Todo.create({
      title       : req.body.title,
      description : req.body.description,
      status      : req.body.status,
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
          res.status(400).json({error: 'validation error', detail : obj})
        } else res.status(500).json({ message: 'ada kesalahan pada server', detail: err })
      })

  }

  static findId(req, res){
    
    const id = req.params.id
    console.log(id)
    Todo.findByPk(id)
      .then(data => {
        if(data) res.status(200).json(data)
        else res.status(404).json({error : '404 not found'})
      })
      .catch(err => {
        res.status(500).json(err)
      })

  }

  static update(req, res){

    const id      = req.params.id
    const userId  = req.userData.id
    console.log(userId)

    Todo.update({
      title       : req.body.title,
      description : req.body.description,
      status      : req.body.status,
      due_date    : Date.now(),
      UserId      : userId
    }, { where: { id } })
      .then(data => {
        console.log(data)
        if(data[0] === 1) res.status(200).json({message :`sucessfully update data`})
        else res.status(404).json({error: '404 not found'})
      })
      .catch(err => {
        if(err.errors){
          const obj = {}
          for(let dt of err.errors){
            obj[dt.path] = dt.message
          }
          res.status(400).json({ error: 'validation error', detail : obj })
        }else res.status(500).json({ message: 'ada kesalahan pada server', detail: err })
      })

  }

  static delete(req, res){

    const id = req.params.id

    Todo.findByPk(id)
      .then(data => data.destroy())
      .then(data => {
        if(data) res.send(200).json({ message: 'successfully delete todos' })
        else res.status(404).json({error: 'error not found'})
      })
      .catch(err => res.status(500).json({message: 'ada kesalahan pada server', detail: err}))
  }
}


module.exports = TodoControllers
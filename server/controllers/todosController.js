const { Todo } = require('../models')

class TodosController{
  
  static create(req,res){
    const {title, description, status, due_date} = req.body

    Todo.create({
      title,
      description,
      status,
      due_date
    })
    .then(data=>{
      res.status(201).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static findAll(req, res){
    Todo.findAll()
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }
  
  static findOne(req,res){
    Todo.findOne({where: {id: req.params.id}})
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static update(req,res){
    const temp = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo.update(temp,{where: {id: req.params.id}})
    .then(data=>{
      res.status(200).json(temp)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static destroy(req,res){
    Todo.destroy({where: {id: req.params.id}})
    .then(data=>{
      res.send(200).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }


}

module.exports = TodosController
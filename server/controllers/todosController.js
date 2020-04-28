const { Todo } = require('../models')

class TodosController{
  
  static create(req, res, next){
    const {title, description, status, due_date} = req.body
    const id = req.userData.id

    Todo.create({
      title,
      description,
      status,
      due_date,
      UserId: id
    })
    .then(data=>{
      res.status(201).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }

  static findAll(req, res, next){
    const id = req.userData.id
    Todo.findAll({
      where: {UserId: id}
    })
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }
  
  static findOne(req, res, next){
    Todo.findOne({where: {id: req.params.id}})
    .then(data=>{
      if(data){
        res.status(200).json(data)
      } else {
        next({name: 'DATA_NOT_FOUND'})
      }
    })
    .catch(err=>{
      next(err)
    })
  }

  static update(req, res, next){
    const dataTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo.update(dataTodo,{where: {id: req.params.id}})
    .then(data=>{
      if (data[0] === 1){
        res.status(200).json(dataTodo)
      } else {
        next({name: 'DATA_NOT_FOUND'})
      }
    })
    .catch(err=>{
      next(err)
    })
  }

  static destroy(req, res, next){
    let dataTodo;
    Todo.findOne({where: {id: req.params.id}})
    .then(data=>{
      if(data){
        dataTodo = data
        return Todo.destroy({where: {id:req.params.id}})
      } else {
        next({name: 'DATA_NOT_FOUND'})
      }
    })
    .then(()=>{
      res.status(200).json(dataTodo)
    })
    .catch(err=>{
      next(err)
    })
  }


}

module.exports = TodosController
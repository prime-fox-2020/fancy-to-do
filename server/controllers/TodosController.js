const {Todo} = require('../models')

class TodosController {
  
  static getMany(req, res, next) {
    Todo.findAll({where: {UserId: req.user.id}}).then(data => {
      res.status(200).json(data)
    })
    .catch(err => next(err))
  }
  
  static createOne(req, res, next) {
    const {title, description, status, due_date} = req.body
    const newObj = {title, description, status, due_date, UserId: req.user.id}

    Todo.create(newObj).then(data => {
      res.status(201).json(data)
    })
    .catch(err => next(err))
  }

  static getOne(req, res, next) {
    const {id} = req.params

    Todo.findByPk(id).then(data => {
      res.status(200).json(data)
    })
    .catch(err => next(err))
  }

  static updateOne(req, res, next) {
    const {id} = req.params
    const {title, description, due_date, status} = req.body
    const newObj = {title, description,due_date, status, UserId: req.user.id}

    Todo.update(newObj, {where: {id}})
    .then(result => {
      return Todo.findByPk(id)
    })
    .then(result => {
      res.status(200).json(result)
    })    
    .catch(err => next(err))
  }
  
  static removeOne(req, res, next) {
    const {id} = req.params
    let todo
    
    Todo.findByPk(id).then(result => {
      todo = result
      return Todo.destroy({where: {id}})
    })
    .then(result => {
      res.status(200).json({todo, message: `Todo with ID ${id} successfully deleted`})
    })
    .catch(err => next(err))
  }
}

module.exports = TodosController
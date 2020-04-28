const {Todo} = require('../models')

class TodosController {
  
  static getMany(req, res) {
    Todo.findAll({where: {UserId: req.user.id}}).then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
  }
  
  static createOne(req, res) {
    const {title, description, status, due_date} = req.body
    const newObj = {title, description, status, due_date, UserId: req.user.id}

    Todo.create(newObj).then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        let errors = err.errors.map(el => el.message)
        res.status(400).json({error: errors})
      } else {
        res.status(500).json({error: err})
      }
    })
  }

  static getOne(req, res) {
    const {id} = req.params

    Todo.findByPk(id).then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({error: {message: `Todo with ID ${id} is not found`}})
      }
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
  }

  static updateOne(req, res) {
    const {id} = req.params
    const {title, description, due_date, status} = req.body
    const newObj = {title, description,due_date, status, UserId: req.user.id}

    Todo.findByPk(id).then(result => {
      if (result) {
        return Todo.update(newObj, {where: {id}})
      } else {
        res.status(404).json({error: {message: `Todo with ID ${id} is not found`}})
      }
    })
    .then(result => {
      return Todo.findByPk(id)
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        let errors = err.errors.map(el => el.message)
        res.status(400).json({error: errors})
      } else {
        res.status(500).json({error: err})
      }
    })
  }
  
  static removeOne(req, res) {
    const {id} = req.params
    let todo
    
    Todo.findByPk(id).then(result => {
      todo = result
      return Todo.destroy({where: {id}})
    })
    .then(result => {
      if (todo) {
        res.status(200).json({todo, message: `Todo with ID ${id} successfully deleted`})
      } else {
        res.status(404).json({error: {message: `Todo with ID ${id} is not found`}})
      }
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
  }
}

module.exports = TodosController
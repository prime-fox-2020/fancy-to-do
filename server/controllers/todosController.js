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
      if(err.errors){
        let temp = []
        err.errors.forEach(error=>{
          temp.push(error.message)
        })
        res.status(400).json({'validation errors' : temp.join(', ')})
      } else {
        res.status(500).json(err)
      }
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
      if(data){
        res.status(200).json(data)
      } else {
        res.status(404).json({message: `Todo doesn't exist`})
      }
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
      if (data[0] === 1){
        res.status(200).json(temp)
      } else {
        res.status(404).json({message: `Todo doesn't exist`})
      }
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static destroy(req,res){
    let temp;

    Todo.findOne({where: {id: req.params.id}})
    .then(data=>{
      if(data){
        temp = data
        return Todo.destroy({where: {id:req.params.id}})
      } else {
        res.status(404).json({message: `Todo doesn't exist`})
      }
    })
    .then(()=>{
      res.status(200).json(temp)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }


}

module.exports = TodosController
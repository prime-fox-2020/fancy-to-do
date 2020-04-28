const { Todo } = require('../models')

const authorization = (req, res, next) =>{
  const id = req.params.id
  Todo.findByPk(id)
  .then(todo=>{
    if(!todo){
      res.status(404).json({message: `Todo doesn't exist`})
    } else if (todo.UserId !== req.userData.id){
      res.status(403).json({message: `forbidden access`})
    } else {
      next()
    }
  })
  .catch(err =>{
    res.status(500).json({message: err.message})
  })
}

module.exports = authorization
const { Todo } = require('../models')

const authorization = (req, res, next) =>{
  const id = req.params.id
  Todo.findByPk(id)
  .then(todo=>{
    if(!todo){
      next({name: 'DATA_NOT_FOUND'})
    } else if (todo.UserId !== req.userData.id){
      next({name: 'FORBIDDEN_ACCESS'})
    } else {
      next()
    }
  })
  .catch(err =>{
    next(err)
  })
}

module.exports = authorization
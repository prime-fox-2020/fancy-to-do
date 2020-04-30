const Todo = require('../models').Todo

const authorization = (req, res, next) => {
  const {id} = req.params
  Todo.findByPk(id)
  .then(todo => {
    if(!todo) {
      next({name: 'ERROR_NOT_FOUND'})
    } else if(todo.UserId !== req.userData.id) {
      next({name: 'FORBIDDEN_ACCESS'})
    } else {
      next()
    }
  })
  .catch(err => {
    next(err)
  })
}

module.exports = authorization
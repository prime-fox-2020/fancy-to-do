'use strict'

const { Todo }    = require('../models')
const jwt         = require('jsonwebtoken')
const privateKey  = 'hanyaSaja'

const authentication = (req, res, next) => {

  const { access_token } = req.headers
  
  if(!access_token){
    next({ name: 'TokenNotFound' })
  }

  try {
    req.userData = jwt.verify(access_token, privateKey)
    next()

  } catch(err) {
    next(err)
  }

}

const authorization = (req, res, next) => {

  const { id } = req.params
  const userId = req.userData.id

  Todo.findByPk(id)
    .then(todo => {
      if(!todo) {
        next({ name : 'ToDoNotFound' })
      }else if(todo.UserId !== userId){
        next({ name : 'Unauthorized' })
      }else{
        next()
      }
    })
    .catch(err => {
      next(err)
    })

}


module.exports = { authentication, authorization }
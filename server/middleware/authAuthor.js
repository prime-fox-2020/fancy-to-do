'use strict'

const { Todo }    = require('../models')
const jwt         = require('jsonwebtoken')
const privateKey  = 'hanyaSaja'

const authentication = (req, res, next) => {

  const { access_token } = req.headers
  
  if(!access_token){
    res.status(404).json({ message : 'token not found' })
  }

  try {
    req.userData = jwt.verify(access_token, privateKey)
    next()

  } catch(err) {
    res.status(401).json({ message: err.message || 'user not authenticated' })
  }

}

const authorization = (req, res, next) => {

  const { id } = req.params
  const userId = req.userData.id

  Todo.findByPk(id)
    .then(todo => {
      if(!todo) {
        res.status(404).json({message : "Todo not found"})
      }else if(todo.UserId !== userId){
        res.status(403).json({message : "Unathorized User"})
      }else{
        next()
      }
    })
    .catch(err => {
      res.status(500).json({ message : err.message || 'Interval Server Error' })
    })

}


module.exports = { authentication, authorization }
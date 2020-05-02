const {User, Todo} = require('../models')
const {verifyToken} = require('../helpers')
const AppError = require('../helpers/appError')

const authUser = {

  authentication: async (req, res, next) => {
    let {access_token} = req.headers
    let message = 'No auth!'
    
    if (!access_token) return next(new AppError(message, 401))
    
    try {
      const payload = await verifyToken(access_token)
      const user = await User.findByPk(payload.id)

      if (!user) return next(new AppError(message, 401))
      req.user = payload
      next()
    } catch(err) {
      next(err)
    }
  },

  authorization: async (req, res, next) => {
    let {id} = req.params

    try {
      const todo = await Todo.findByPk(id)
      if (!todo) return next(new AppError(`Todo with ID ${id} is not found`, 404))
      if (todo.UserId !== req.user.id) return next(new AppError(`Not authorize!`, 403))
      next()
    } catch(err) {
      next(err)
    }
  }
}

module.exports = authUser
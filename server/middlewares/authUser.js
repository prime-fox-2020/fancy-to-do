const {User, Todo} = require('../models')
const {verifyToken} = require('../helpers')

const authUser = {

  authentication: async (req, res, next) => {
    let {access_token} = req.headers
    let error = {error: {message: 'No auth!'}}
    
    if (!access_token) return res.status(401).json(error)
    
    try {
      const payload = await verifyToken(access_token)
      const user = await User.findByPk(payload.id)

      if (!user) return res.status(401).json(error)
      req.user = payload
      next()
    } catch(err) {
      return res.status(500).json(err)
    }
  },

  authorization: async (req, res, next) => {
    let {id} = req.params

    try {
      const todo = await Todo.findByPk(id)
      console.log(req.params)
      if (!todo) return res.status(404).json({error: {message: `Todo with ID ${id} is not found`}})
      if (todo.UserId !== req.user.id) return res.status(403).json({error: {message: `Not authorize!`}})
      next()
    } catch(err) {
      return res.status(500).json(err)
    }
  }
}

module.exports = authUser
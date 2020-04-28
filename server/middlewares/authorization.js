const { Todo } = require('../models')                  // author proced
// const jwt = require('jsonwebtoken')                    // authen proced
// const secretKey = 'rahasia'                            // authen proced (took from helper, readable)

const authorization = (req, res, next) => {
    const { id } = req.params

    Todo.findByPk(id)
    .then( todoUser =>{
        if (!todoUser) {
            res.status(404).json({error: 'user not found'})
        } else if (todoUser.UserId != req.userData.id) {
            res.status(403).json({error: 'Forbidden user access'})
        } else if (todoUser.UserId == req.userData.id) {
            // if user are authorized, next to TodoController
            next()                                     
        }
    })
    .catch( err =>{
        res.status(500).json({error: err.message || 'internal error server'})
    })
    
}

module.exports = { authorization }
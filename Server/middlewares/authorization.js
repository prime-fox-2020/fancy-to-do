const { Todo } = require('../models')

const authorization = (req, res, next) => {
    let id = req.params.id

    Todo.findByPk(id)
    .then(data => {
        // console.log(data)
        if (data) {
            if (data.UserId == req.currentUserId) {
                next()
            } else{
                // res.status(401).json({message: 'unauthorized'})
                next({message: 'unauthorized', status: 401})
            }
        } else {
            // res.status(400).json({message : 'not found'})
            next({message: `Todo with id ${id} not found`, status: 400})
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization
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
                next({message: '401 - Unauthorized.', status: 401})
            }
        } else {
            next({message: `Todo with id ${id} not found`, status: 404})
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization
const {Todo} = require('../models')

function authorization (req, res, next) {
    const userId = Number(req.userData.id)
    
    console.log(req.params)
    Todo.findByPk(Number(req.params.id))
    .then(data => {
        if (!data) {
            next({name: 'LoginValidationError'})
        }
        else if (data.UserId !== userId) {
            next({name: 'UNAUTHORIZED'})
        }
        else {
            next()
        }
    })
    .catch (err => {
        next(err)
    })
}

module.exports = authorization
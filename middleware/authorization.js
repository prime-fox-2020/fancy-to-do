const { Todo } = require('../models')

function authorization(req,res,next){
    const {id} = req.params
    const userId = req.userData.id

    Todo.findByPk(id)
    .then(todo => {
        if(!todo){
            next({name : `Data Not Found`})
        } else if (todo.UserId !== userId){
            next({name : `Forbidden Access`})
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {
    authorization
}
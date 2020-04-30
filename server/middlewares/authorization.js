const {Todo} = require('../models')

const authorization = (req, res, next) => {
    const { id } = req.params
    const userId = req.userData.id
    
    Todo.findByPk(id)
    .then( todo => {
        if(todo.UserId !== userId){
            next({name: 'FORBIDDEN_ACCESS'})
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
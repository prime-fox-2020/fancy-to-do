const {Todo} = require('../models')

const authorization = (req, res, next) => {
    const { id } = req.params
    const userId = req.userData.id
    
    Todo.findByPk(id)
    .then( todo => {
        if(!todo){
            res.status(404).json({ message: 'Error Not Found' })
        } else if(todo.UserId !== userId){
            res.status(403).json({ message: 'Forbidden access' })
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message || 'Internal Server Error' })
    })

}

module.exports = {
    authorization
}
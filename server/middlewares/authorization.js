const {Todo} = require('../models')

const authorization = (req, res, next) => {
    const { id } = req.params
    const userId = req.userData.id
    
    Todo.findByPk(id)
    .then( todo => {
        if(!todo){
            res.status(404).json({ errorCode: 'DATA_NOT_FOUND', message: 'No data matched' })
        } else if(todo.UserId !== userId){
            res.status(403).json({ errorCode: 'ACCESS_DENIED', message: 'Forbidden access' })
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message || 'UNKNOWN_ERROR' })
    })

}

module.exports = {
    authorization
}
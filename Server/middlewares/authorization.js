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
                res.status(401).json({message: 'unauthorized'})
            }
        } else {
            res.status(400).json({message : 'not found'})
        }
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
}

module.exports = authorization
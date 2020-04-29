const { getUserData } = require('../helpers/token')
const { Todo } = require('../models')

function authentication (req, res, next) {
    const { access_token } = req.headers

    if(!access_token) {
        res.status(404).json({ message: 'token not found' })

        try {
            req.userData = getUserData(access_token)
            next()
        } catch (err) {
            res.status(401).json({ message: 'You are not authenticated' })
        }
    }
}

function authorization (req, res, next) {
    const todoId = req.params.id
    const userId = getUserData(access_token).id
    console.log(todoId, userId)

    Todo.findByPk(todoId)
    .then(data => {
        if(!data) {
            res.status(404).json({ message: `Todo ID ${todoId} not found` })
        } else if (data.UserId !== userId) {
            res.status(403).json({ message: `You are not authorized` })
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

module.exports = {
    authentication,
    authorization
}
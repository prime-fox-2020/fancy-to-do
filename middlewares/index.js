const { getUserData } = require('../helpers/token')
const { Todo } = require('../models')

function authentication (req, res, next) {
    const { access_token } = req.headers
    console.log(req.headers)

    if(!access_token) {
        throw { messages: ['Please sign in first'], statusCode: 403 }
    }

    try {
        req.userData = getUserData(access_token)
        
        next()
    } catch (err) {
        
        throw { messages: ['Please sign in first'], statusCode: 403 }
    }
    
}

function authorization (req, res, next) {
    const todoId = req.params.id
    const userId = getUserData(req.headers.access_token).id
    console.log(todoId, userId)

    Todo.findByPk(todoId)
    .then(data => {
        if(!data) {
            throw { messages: [`Todo ID ${todoId} not found`], statusCode: 404 }
        } else if (data.UserId !== userId) {
            throw { messages: [`You are not authorized`], statusCode: 401 }
        } else {
            next()
        }
    })
    .catch(next)
}

function errorHandler (err, req, res, next) {
    console.log(err)
    let statusCode = 500
    let messages = []

    if (err.name === 'SequelizeValidationError') {
        console.log(err)
        statusCode = 400

        for (let i = 0; i < err.errors.length; i++) {
            messages.push(err.errors[i].message)
        }
    } else if (err.messages) {
        statusCode = err.statusCode

        for(let i = 0; i < err.messages.length; i++) {
            messages.push(err.messages[i])
        }
    }
    else {
        messages.push('Internal sever error')
    }
    res.status(statusCode).json({ messages })
}

module.exports = {
    authentication,
    authorization,
    errorHandler
}
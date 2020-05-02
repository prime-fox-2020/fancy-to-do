const express = require('express')
const routes = express.Router()
const todoController = require('../controllers/todoController.js')
const jwt=require('jsonwebtoken')
const secretKey="rahasia"

const { Todo } = require('../models')
const authentication = (request, respond, next) => {
    //verify access token (req.headers)
    const {access_token}  = request.headers
    console.log({access_token})

    if (!access_token) {
        next({
            name: 'Access Token not Found'
        })
    
    }
    try {
        console.log('authenticating...')
        const decode = jwt.verify(access_token, secretKey)
        request.userData = decode
        next()
    } catch (err) {
        console.log(err)
        // next({
        //     name: 'Authentication Failed!'
        // })
    }
}
const authorization = (request, respond, next) => {
    Todo.findByPk(request.params.id)
        .then(data => {
            if (!data) {
                respond.status(404).json({
                    message: 'Object not Found!'
                })
            } else if (data.UserId !== String(request.userData.id)) {
                respond.status(403).json({
                    message :'Forbidden Access!'
                })
            } else {
                next()
            }
        })
        .catch(err => {
            respond.status(500).json({
                message: 'Internal Server Error!'
            })
        })
}

routes.get('/', authentication, todoController.findAll)
routes.post('/', authentication, todoController.postNew)
routes.get('/:id', authentication, todoController.findOne)
routes.put('/:id', authentication, authorization, todoController.updateList)
routes.delete('/:id', authentication,authorization, todoController.deleteList)


module.exports = routes
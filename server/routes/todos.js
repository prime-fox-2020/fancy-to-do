const route = require('express').Router()
const TodosController = require('../controllers/todoscontroller')
const jwt = require('jsonwebtoken')
const secretKey = 'lolikeano'
const Todo = require('../models').Todo

const Authentication = (req, res, next) => {
    const {access_token} = req.headers
    try {
        const decoded = jwt.verify(access_token, secretKey)
        req.userData = decoded
        next()
    }catch(err){res.status(401).json({message: err.message || `User not found`})}
}

const Authorization = (req, res, next) => {
    const {id} = req.params
    Todo.findByPk(id)
    .then(data => {
        if(!data){res.status(404).json({message: `To do not found`})}
        else if(data.UserId !== req.userData.id){res.status(403).json({message: `Forbidden access`})}
        else{next()}
    }).catch(err => {res.status(500).json({message: err.message || `Internal server error`})})
}

route.get('/', Authentication, TodosController.show)
route.get('/:id', TodosController.showId)
route.post('/', Authentication, TodosController.add)
route.put('/:id', TodosController.update)
route.delete('/:id', Authentication, Authorization, TodosController.delete)

module.exports = route
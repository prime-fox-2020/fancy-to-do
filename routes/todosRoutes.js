const router = require('express').Router()
const toDoController = require('../controllers/toDoController')
const jwt = require('jsonwebtoken')
const secretKey = 'apa aja'
const ToDo = require('../models').FancyToDo

const authentication = (req,res,next) => {
    const { access_token } = req.headers
    console.log(access_token)

    if(!access_token){
        res.status(404).json({ message: 'token not found'})
    }
    try{
        const decoded = jwt.verify(access_token, secretKey)
        req.userData = decoded
        next()
    } catch(err){
        res.status(401).json({ message : err.message || "user not authenticated "})

    }
}

const authorization = (req,res,next) => {
    const { id } = req.params
    
}



router.get('/', authentication ,toDoController.readTodo)
router.get('/:id',authentication , toDoController.readTodoById)
router.post('/', authentication ,toDoController.createTodo)
router.put('/:id', authentication ,toDoController.updateTodo)
router.delete('/:id',authentication , toDoController.deleteTodo)

module.exports = router
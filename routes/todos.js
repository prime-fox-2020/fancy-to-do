const express = require('express')
const router = express.Router()
const todosControl = require('../controller/todos')
const TodoModel = require('../models').Todo
const jwt = require('jsonwebtoken')
const secretKey = 'wololo'

const auth = (req, res, next) => {
    console.log(req.headers)
    const { access_token } = req.headers

    if(!access_token){
        res.status(404).json({message: 'token not found'})
    }
    try {
        const decoded = jwt.verify(access_token, secretKey)
        req.userData = decoded
        console.log('awaw')
        next()
    } catch(err){
        next(err)
    }
}

const author = (req, res, next) =>{
    const { id } = req.params

    TodoModel.findByPk(id)
    .then( todo =>{
        if(!todo){
            res.status(404).json({message: 'Todo not found'})
        } else if(todo.UserId !== req.userData.id){
            res.status(403).json({message: 'Forbidden Access'})
        } else {
            next()
        }
    })
    .catch( err =>{
        res.status(500).json({message: err.message || 'Internal Server Error'})
    })
}



router.get('/', auth, todosControl.getTodos)
router.post('/', auth, todosControl.postTodos)
router.get('/:id', auth,  todosControl.getTodosId)
router.put('/:id', auth, author, todosControl.todosUp)
router.delete('/:id', auth, author, todosControl.todosDel)

module.exports = router
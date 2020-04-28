const router = require('express').Router()
const todoRouter = require('./todo-router')
const userRouter = require('./user-router')
router.get('/', (req, res) => {
    res.send("hello world ini dari index router")
})

router.use('/todos', todoRouter)
router.use('/users', userRouter)

module.exports = router
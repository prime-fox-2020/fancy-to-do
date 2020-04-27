const router = require('express').Router()
const todoRouter = require('./todo-router')

router.get('/', (req, res) => {
    res.send("hello world ini dari index router")
})

router.use('/todo', todoRouter)

module.exports = router
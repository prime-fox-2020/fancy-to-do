const router = require('express').Router()
const todoRouter = require('./todo-router')
const userRouter = require('./user-router')
const thirdPartyRouter = require('./thirdParty-router')
router.get('/', (req, res) => {
    res.send("hello world ini dari index router")
})

router.use('/todos', todoRouter)
router.use('/users', userRouter)
router.use('/holidays', thirdPartyRouter)

module.exports = router
const router = require('express').Router()
const todoRouter = require('../routers/todo')
const userRouter = require('../routers/user')

router.get('/', (req, res) => {
    res.json({
        msg : `Welcome to todo app`
    })
})
router.use('/todo', todoRouter)
router.use('/user', userRouter)

module.exports = router
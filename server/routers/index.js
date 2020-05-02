const router = require('express').Router()
const todoRouter = require('../routers/todo')
const userRouter = require('../routers/user')
const voiceRouter = require('../routers/voice')

router.get('/', (req, res) => {
    res.json({
        msg : `Welcome to todo app`
    })
})
router.use('/todo', todoRouter)
router.use('/user', userRouter)
router.use('/voice', voiceRouter)

module.exports = router
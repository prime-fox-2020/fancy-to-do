const router = require('express').Router()
const todoRouter = require('../routers/todo')

router.get('/', (req, res) => {
    res.json({
        msg : `Welcome to todo app`
    })
})
router.use('/todo', todoRouter)

module.exports = router
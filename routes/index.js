const router = require('express').Router()
const todo = require('./todo')

router.get('/', (req,res) => {
    res.send('hi ini router')
})
router.use('/todos', todo)


module.exports = router
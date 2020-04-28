const router = require('express').Router()
const todo = require('./todo')
const user = require('./user')

// router.get('/', (req,res) => {
//     res.send('hi ini router')
// })

router.use('/', user)
router.use('/todos', todo)


module.exports = router
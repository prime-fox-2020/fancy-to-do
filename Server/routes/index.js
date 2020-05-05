const router = require('express').Router()
const todo = require('./todo')
const user = require('./user')
const muslimSalat = require('./muslimSalat')

// router.get('/', (req,res) => {
//     res.send('hi ini router')
// })

router.use('/', user)
router.use('/todos', todo)
router.use('/jadwalsalat', muslimSalat)


module.exports = router
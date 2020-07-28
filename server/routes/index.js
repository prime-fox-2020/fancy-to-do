const router = require('express').Router()
const todos = require('./todos')
const users = require('./users')
const apis = require('./api')

// router.get('/', (req, res) => {res.send(`<h1>Welcome to the home page</h1>`)})
// console.log('masuk routing index')
router.use('/todos', todos)
router.use('/users', users)
router.use('/adds', apis)

module.exports = router
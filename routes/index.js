const router = require('express').Router()
const todos = require('./todos')
const users = require('./users')

// router.get('/', (req, res) => {res.send(`<h1>Welcome to the home page</h1>`)})
// console.log('masuk routing index')
router.use('/todos', todos)
router.use('/users', users)

module.exports = router
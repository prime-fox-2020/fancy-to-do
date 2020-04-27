const router = require('express').Router()
const todos = require('./todos')

// router.get('/', (req, res) => {res.send(`<h1>Welcome to the home page</h1>`)})
console.log('masuk routing index')
router.use('/todos', todos)

module.exports = router
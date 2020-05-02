const express = require('express')
const router = express.Router()
const todosRoute = require('./todos')
const UserControl = require('../controller/users')

router.use('/todos', todosRoute)
router.post('/register', UserControl.register)
router.post('/login', UserControl.login)
router.post('/googleSignIn', UserControl.googleSignIn)

module.exports = router
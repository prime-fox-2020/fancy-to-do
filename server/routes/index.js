const express = require('express')
const router = express.Router()
const TodoRoutes = require('./todoRoutes')
const UserRoutes = require('./userRoutes')

router.use('/todos', TodoRoutes)
router.use('/', UserRoutes)


module.exports = router
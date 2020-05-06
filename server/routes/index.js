const express = require('express')
const router = express.Router()

const TodosRouter = require('../routes/todos')
const UsersRouter = require('../routes/users')

router.use('/todos', TodosRouter)
router.use('/', UsersRouter)




module.exports = router
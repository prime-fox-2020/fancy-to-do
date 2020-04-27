const express = require('express')
const router = express.Router()

const TodosRouter = require('../routes/todos')

router.use('/todos', TodosRouter)


module.exports = router
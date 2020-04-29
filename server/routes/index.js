const express = require('express')
const router = express.Router()

const TodosRouter = require('../routes/todos')
const UsersRouter = require('../routes/users')
const googleController = require('../controllers/googleController')

router.use('/todos', TodosRouter)
router.use('/users', UsersRouter)
// router.get('/google', googleController.login)




module.exports = router
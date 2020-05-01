const router = require('express').Router()
const TodoController = require('../controllers/todo')
const { authentication, authorization } = require('../middlewares')

router.use(authentication)

router.post('/', TodoController.create)
router.get('/', TodoController.getAll)
router.get('/:id', authorization, TodoController.getById)
router.put('/:id', authorization, TodoController.edit)
router.delete('/:id', authorization, TodoController.delete)
router.get('/getTrivia/:id', authorization, TodoController.getTrivia)

module.exports = router
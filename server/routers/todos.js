const router=require('express').Router()
const todosController=require('../controller/todosController')
const authentication=require('../middleware/authentication')
const authorization=require('../middleware/authorization')

router.use(authentication)
router.get('/',todosController.show)
router.post('/',todosController.addProject)
router.put('/:id',authorization,todosController.updateProject)
router.get('/:id',authorization,todosController.search)
router.delete('/:id',authorization,todosController.delete)

module.exports=router
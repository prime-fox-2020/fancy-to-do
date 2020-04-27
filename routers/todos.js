const router=require('express').Router()
const todosController=require('../controller/todosController')

router.get('/',todosController.show)
router.post('/',todosController.addProject)
router.put('/:id',todosController.updateProject)
router.get('/:id',todosController.search)
router.delete('/:id',todosController.delete)

module.exports=router
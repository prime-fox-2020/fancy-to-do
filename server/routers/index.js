const router=require('express').Router()
const todosRouter=require('./todos')
const userRouter=require('./user')

router.use('/todos',todosRouter)
router.use('/user',userRouter)


module.exports=router
const router=require('express').Router()
const todosRouter=require('./todos')
const userRouter=require('./user')
const imgurRouter=require('./imgur')

router.use('/todos',todosRouter)
router.use('/user',userRouter)
router.use('/imgur',imgurRouter)


module.exports=router
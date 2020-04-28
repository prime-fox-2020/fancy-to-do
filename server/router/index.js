const router = require('express').Router()
const todosRouter = require('./todosRouter')
const userRouter = require('./userRouter')

router.get('/', (req,res)=>{
  res.status(200).json("Fancy Todo")
})

router.use('/todos', todosRouter)
router.use('/', userRouter)

module.exports = router
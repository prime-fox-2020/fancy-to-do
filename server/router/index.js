const router = require('express').Router()
const todosRouter = require('./todosRouter')

router.get('/', (req,res)=>{
  res.status(200).json("Fancy Todo")
})

router.use('/todos', todosRouter)

module.exports = router
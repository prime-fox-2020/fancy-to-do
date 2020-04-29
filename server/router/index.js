const router = require('express').Router()
const todosRouter = require('./todosRouter')
const userRouter = require('./userRouter')
const calendarRouter = require('./calendarRouter')

// router.get('/', (req,res)=>{
//   res.status(200).json("Fancy Todo")
// })

router.use('/', userRouter)
router.use('/todos', todosRouter)
router.use('/calendar', calendarRouter)

module.exports = router
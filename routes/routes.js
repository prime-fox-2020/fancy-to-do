const router = require('express').Router()
const toDoRoutes = require('../routes/todosRoutes')
const userRoutes = require('../routes/userRoutes')

router.get('/', (req,res)=>{
    res.send('this is home')
})
router.use('/todos', toDoRoutes)
router.use('/user', userRoutes)

module.exports = router
const router = require('express').Router()
const toDoRoutes = require('../routes/todosRoutes')

router.get('/', (req,res)=>{
    res.send('this is home')
})
router.use('/todos', toDoRoutes)

module.exports = router
const router = require('express').Router()
const toDoRoutes = require('../routes/todosRoutes')
const userRoutes = require('../routes/userRoutes')
const weatherRoutes = require('../routes/weatherRoutes')

router.get('/', (req,res)=>{
    res.send('this is home')
})
router.use('/weather', weatherRoutes)
router.use('/todos', toDoRoutes)
router.use('/user', userRoutes)

module.exports = router
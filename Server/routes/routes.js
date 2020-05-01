const router = require('express').Router()
const toDoRoutes = require('../routes/todosRoutes')
const userRoutes = require('../routes/userRoutes')
const weatherRoutes = require('../routes/weatherRoutes')
const speechRoutes = require('../routes/speechRoutes')

router.get('/', (req,res)=>{
    res.send('this is home')
})
router.use('/weather', weatherRoutes)
router.use('/speech', speechRoutes)
router.use('/todos', toDoRoutes)
router.use('/user', userRoutes)

module.exports = router
const route = require('express').Router()
const ToDoRoute = require('./todos')
const UserRoute = require('./user')

route.get('/', (req,res)=>{
    res.send("HOME")
})
route.use('/todos', ToDoRoute)
route.use('/user', UserRoute)

module.exports = route
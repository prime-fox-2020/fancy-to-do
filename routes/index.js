const route = require('express').Router()
const ToDoRoute = require('./todos')

route.get('/', (req,res)=>{
    res.send("HOME")
})
route.use('/todos', ToDoRoute)

module.exports = route
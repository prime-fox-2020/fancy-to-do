const routes = require('express').Router()
const todos = require('./todos.js')
const user = require('./user.js')


routes.get('/',(req,res)=>{
    res.send('homepage')
})
routes.use('/todos',todos)

routes.use('/users',user)

routes.get('/')















module.exports = routes
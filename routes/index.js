const route = require('express').Router()

const todoRoute = require('./todoRoute')
const userRoute = require('./userRoute')

route.use('/user', userRoute)
route.use('/todos', todoRoute)


module.exports = route
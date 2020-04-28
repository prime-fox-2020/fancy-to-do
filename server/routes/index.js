'use strict'

const routes  = require('express').Router()
const todos   = require('./todos')
const users   = require('./user')

routes.use('/todos', todos)
routes.use('/users', users)

module.exports = routes
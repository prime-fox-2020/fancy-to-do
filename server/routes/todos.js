const route = require('express').Router()
const todo = require('../controllers/todos.js')
const {authentication,authorization,authorizationSU,authorizationSA} = require('../middlewares/auth.js')

//get all 
route.get('/' , authentication , todo.findAll)
//get all but only user , user
route.get('/mytodos' , authentication , todo.findAllMyTodos)
//get all targeted id 
route.get('/:id' , authentication , todo.findId)
//post add , admin
route.post('/' , authentication , authorizationSA , todo.add)
//put delete only admin or User A only can update A , B cannot u A AUTHORIZATION DI CONTROLLERS
route.put('/:id' , authentication , authorizationSU , todo.update)
//put delete only admin or User A only can delete A , B cannot delete A AUTHORIZATION DI CONTROLLERS
route.delete('/:id' , authentication , authorizationSU , todo.delete)







module.exports=route
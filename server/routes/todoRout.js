const route = require('express').Router();

const FancyToDo = require('../controller/todoCont');
const { authentication } = require('../middleware/authentication')
const { authorization } = require('../middleware/authorisation')


route.use(authentication) 
route.get('/', FancyToDo.findAll)
route.post('/', FancyToDo.create)
route.get('/:id', authorization, FancyToDo.findByPk)
route.put('/:id', authorization, FancyToDo.update)
route.delete('/:id', authorization, FancyToDo.delete)

module.exports = route;

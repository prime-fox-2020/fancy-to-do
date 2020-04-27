const route = require('express').Router();

const FancyToDo = require('../controller/todoCont');

route.get('/', FancyToDo.findAll)
route.post('/', FancyToDo.create)
route.get('/:id', FancyToDo.findByPk)
route.put('/:id', FancyToDo.update)
route.delete('/:id', FancyToDo.delete)

module.exports = route;

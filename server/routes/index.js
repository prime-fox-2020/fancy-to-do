const route = require('express').Router();

const todoRout = require('./todoRout');

route.get('/', (req, res) => {
    res.send('ini di router');
})

route.use('/todos', todoRout)

module.exports = route;

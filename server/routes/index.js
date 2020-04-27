const route = require('express').Router();

const todoRout = require('./todoRout');
const userRout =require('./userRout')

route.get('/', (req, res) => {
    res.send('ini di router');
})

route.use('/todos', todoRout)
route.use('/users', userRout)

module.exports = route;

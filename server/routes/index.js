const route = require('express').Router();

const todoRout = require('./todoRout');
const userRout =require('./userRout')
const calender = require('./calender');

route.get('/', (req, res) => {
    res.send('ini di router');
})

route.use('/todos', todoRout)
route.use('/users', userRout)
route.use('/holidays', calender)

module.exports = route;

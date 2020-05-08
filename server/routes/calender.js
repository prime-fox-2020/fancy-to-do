const route = require('express').Router();
const { Calender } = require('../controller/calenderCont');

route.get('/', Calender.holidays)

module.exports = route;




const route = require('express').Router();
const { Calender } = require('../controller/calenderCont');

route.get('/', Calender.holidays)

module.exports = route;


// const { getAccessToken, authorize } = require('../googleCalender');

// route.get('/',(req, res) => {
//     if (req.query.code) {
//         getAccessToken(req.query.code, (err, data) => {
//             if (err) {
//                 res.send(err)
//             } else {
//                 res.send(data)
//             }
//         })
//     } else {
//         authorize((authUrl) => {
//             res.redirect(authUrl)
//         })
//     }
// })



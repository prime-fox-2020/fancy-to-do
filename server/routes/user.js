const route = require('express').Router()
const user = require('../controllers/user.js')



route.get('/',user.findAll)
route.post('/register',user.register)
route.post('/login',user.login)
route.delete('/delete/:id',user.delete)
route.post('/google-sign-in',user.googleSign)
route.get('/info',user.getInfo)

























module.exports=route
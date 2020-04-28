const route = require('express').Router()
const todo = require('../controllers/todos.js')



// route.get('/',(req,res)=>{
//     res.send('home for todos')
// })
route.get('/',todo.findAll)
route.get('/:id',todo.findId)
route.post('/',todo.add)
route.put('/:id',todo.update)
route.delete('/:id',todo.delete)























module.exports=route
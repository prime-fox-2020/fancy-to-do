const express = require('express')
const app = express()
const routesTodo = require('./routes/todo-routes.js')

const port = 3000

app.listen(port, ()=>{
    console.log(`App online on port ${port}`)
})
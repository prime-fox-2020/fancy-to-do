const express = require('express')
const app = express()
const routesTodo = require('./routes/todo-routes.js')
const routesUser = require('./routes/user-routes.js')

const port = 3000
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(routesTodo)
app.use(routesUser)

app.listen(port, ()=>{
    console.log(`App online on port ${port}`)
})

module.exports = app
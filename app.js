const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const port = 3000

app.use(express.urlencoded({extended: true}))
app.use('/', routes)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`This app is running on port ${port}`)
})

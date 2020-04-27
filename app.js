const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/', routes)

app.listen(port, ()=>{
    console.log('This apps is running at port : ', port)
})
module.exports = app
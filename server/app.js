const express = require('express')
const app = express()
const port = 3000

const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(routes)

app.listen(port, ()=> { console.log(`FANCY TODO running on PORT: ${port}`)})

module.exports = app;
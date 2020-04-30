const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

const routes = require('./routes')
// const userRoutes = require('./routes/user')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, ()=> { console.log(`FANCY TODO running on PORT: ${port}`)})

module.exports = app;
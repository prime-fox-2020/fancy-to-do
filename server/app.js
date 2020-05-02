
const env = require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

const routes = require('./routes')
const errorHandler  = require('./middlewares/errorHandler')
// const userRoutes = require('./routes/user')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(errorHandler)

app.listen(port, ()=> { console.log(`FANCY TODO running on PORT: ${port}`)})

module.exports = app;
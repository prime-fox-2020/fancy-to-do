require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/index.js')
const errorHandler = require('./middlewares/errorHandler.js')
const port = 3000
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(port, () => {
    console.log(`App online on port ${port}`)
})
app.use(cors())
app.use(routes)
app.use(errorHandler)

module.exports = app
const express = require('express')
const app = express()
const routes = require('./routes/index.js')
const errorHandler = require('./middlewares/errorHandler.js')
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.listen(port, () => {
    console.log(`App online on port ${port}`)
})
app.use(routes)
app.use(errorHandler)

module.exports = app
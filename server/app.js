// require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3003
const routes = require('./routes')
const errorHandler = require('./middlewares/errorhandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, access_token")
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS")
    next()
})
app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})

module.exports = app
const express = require('express')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const app = express()

const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log('This app is listening to port :', port)
})
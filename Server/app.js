require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const errHandler = require('./middlewares/errHandler')
const app = express()
const port = process.env.port || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use(routes)
app.use(errHandler)

app.listen(port, () => {
    console.log('Listening app on port :', port);
})
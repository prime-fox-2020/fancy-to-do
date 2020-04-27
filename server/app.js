require('dotenv').config()
const express = require('express')
const route = require('./routes')
app = express()
const port = process.env.port

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', route)

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})
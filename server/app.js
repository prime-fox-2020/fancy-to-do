const express = require('express')
const app = express()
const route = require('./router')
const errHandler = require('./midlewares/errorHandler')
const cors = require('cors')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())
app.use(route)
app.use(errHandler)

app.listen(port, () => {
    console.log(`This app is listening on port: ${port}`)
})
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended : true}))

const route = require('./routes')
app.use(route)

app.listen(port, () => {
    console.log('listening on port', port)
})

module.exports = app
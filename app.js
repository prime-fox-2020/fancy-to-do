const express = require('express')
const app = express()
const routes = require('./routes')
const PORT = 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(routes)


app.listen(PORT, () => {
    console.log('====================')
    console.log('Aplikasi berjalan di port ' + PORT)
    console.log('====================')
})

module.exports = app

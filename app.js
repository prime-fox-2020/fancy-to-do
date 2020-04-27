const express = require('express')
const app = express()
const router = require('./router')
const PORT = 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/', router)


app.listen(PORT, () => {
    console.log('====================')
    console.log('Aplikasi berjalan di port ' + PORT)
    console.log('====================')
})


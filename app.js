const express = require('express')
const app = express()
const PORT = 3000
const routers = require('./routers')
const errorHandler = require('./middleware/errorHandler')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/', routers)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routers = require('./routers')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(routers)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})
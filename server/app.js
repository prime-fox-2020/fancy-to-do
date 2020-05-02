const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config({path: './config/config.env'})
const routers = require('./routers')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routers)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})
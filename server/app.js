const express = require('express')
const router = require('./router')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)
app.use(errorHandler)

app.listen(PORT, ()=>{
  console.log(`Listening on PORT ${PORT}`)
})
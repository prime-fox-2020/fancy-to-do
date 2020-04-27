const express = require('express')
const router = require('./router')

const app = express()
const PORT = 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)

app.listen(PORT, ()=>{
  console.log(`Listening on PORT ${PORT}`)
})
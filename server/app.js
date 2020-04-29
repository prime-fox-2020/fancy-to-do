require('dotenv').config();
const express = require('express')
const app = express()
const port = 3000
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/', router)
app.use(errorHandler)

app.listen(port, ()=>{
  console.log(`LISTENING ON PORT ${port}`);
})
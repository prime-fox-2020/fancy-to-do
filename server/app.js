require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes')
const cors = require('cors')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(cors())

app.use('/', router)
app.use(errorHandler)

app.listen(port, ()=>{
  console.log(`LISTENING ON PORT ${port}`);
})
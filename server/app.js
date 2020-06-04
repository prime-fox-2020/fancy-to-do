require('dotenv').config()

const express = require('express')

const cors = require('cors');

const app = express()

const PORT = process.env.PORT || 3001;
const errorhandler = require('./middlewares/errorHandler')

const routes = require('./routes')

app.use(express.urlencoded({extended:true}))

app.use(express.json())

app.use(cors())

app.use(routes)

app.use(errorhandler)

app.listen(PORT,()=>{
  console.log(PORT, '-----------------')
})
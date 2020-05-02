'use strict'
const env           = require('dotenv').config()
const express       = require('express')
const cors          = require('cors')
const routes        = require('./routes')
const errorHandler  = require('./middleware/errorHandler')
const app           = express()
const port          = 3000 || process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(routes)
app.use(errorHandler)

app.listen(port, () => console.log('Server is running'))

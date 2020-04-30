const express = require('express');
const app = express()
const port = 3000
const routes = require('./routes/index.js')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.set('view engine','ejs')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',routes)
app.use(errorHandler)




app.listen (port,(err,res)=>{
    console.log(`running on port ${port}`)
})

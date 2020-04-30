const express=require('express')
const app =express()
const cors=require('cors')
const routers=require('./routers')
const errorHandler=require('./middleware/errorHandler')
const port=3000

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use('/',routers)
app.use(errorHandler)

app.listen(port,function(){
    console.log(`Listening to port ${port}`)
})

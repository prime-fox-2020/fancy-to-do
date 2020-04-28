const express=require('express')
const app =express()
const port=3000
const routers=require('./routers')
const errorHandler=require('./middleware/errorHandler')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',routers)
app.use(errorHandler)

app.listen(port,function(){
    console.log(`Listening to port ${port}`)
})

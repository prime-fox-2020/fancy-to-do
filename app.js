const express=require('express')
const app =express()
const port=3000
const routers=require('./routers')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',routers)

app.listen(port,function(){
    console.log(`Listening to port ${port}`)
})

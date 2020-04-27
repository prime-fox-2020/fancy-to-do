const express = require("express")
const app = express()
const port = 3000
const indexRouter = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(indexRouter)

app.listen(port, ()=> {
    console.log('Berjalan di port ' + port);
    
})

module.exports = app
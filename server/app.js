if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}
console.log(process.env.NODE_ENV);    


const express = require("express")
const app = express()
const port = 3000
const indexRouter = require('./routes')
const errorHandler = require('./middlewares/errorHandler')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(indexRouter)
app.use(errorHandler)

app.listen(port, ()=> {
    console.log('Berjalan di port ' + port);
})

module.exports = app


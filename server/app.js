require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }));
app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

module.exports = app
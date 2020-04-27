const express = require('./node_modules/express')
const routes = require('./routes')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use(routes)

app.listen(port, () => {
    console.log('Listening app on port :', port);
})
const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

const router = require('./routes');
const errorHanler = require('./middleware/errorHandler');

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// app.get('/', (req, res) => res.send('Hello World!'))

app.use('/', router)
app.use(errorHanler)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))


module.exports = app;




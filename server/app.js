const errorHandler = require('./middleware/errorHandler')
const express = require('express');
const router = require('./routes');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use('/', router);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = app
require('dotenv').config();
const express = require('express');
const router = require('./routes');
var cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(router)

app.listen(port, () => console.log(`The app is listening on port ${port}`));

module.exports = app;
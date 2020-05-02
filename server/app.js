const express = require('express');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
require('dotenv').config();

const app = express(), port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(router);
app.use(errorHandler);

app.listen(port, () => console.log(`Running in port ${port}`));
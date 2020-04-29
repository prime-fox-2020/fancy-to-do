const express = require('express');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express(), port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(router);
app.use(errorHandler);

app.listen(port, () => console.log(`Running in port ${port}`));
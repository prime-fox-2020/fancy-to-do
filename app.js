const express = require('express');
const router = require('./routes');
const app = express(), port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(router);

app.listen(port, () => console.log(`Running in port ${port}`));
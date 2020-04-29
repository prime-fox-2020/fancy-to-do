require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const errorHanler = require('./middlewares/errorHandler');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);
app.use(errorHanler);


app.listen(PORT, () => console.log('Server Hosted on:', PORT));
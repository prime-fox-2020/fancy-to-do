// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHanler = require('./middlewares/errorHandler');
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errorHanler);

app.listen(PORT, () => console.log('Server Hosted on:', PORT));
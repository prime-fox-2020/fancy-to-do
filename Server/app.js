const express = require('express');
const errorHandling = require('./middlewares/errorHandling');
const cors = require('cors');
const app = express();
const PORT = 3000;

const router = require('./router');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);
app.use(errorHandling);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
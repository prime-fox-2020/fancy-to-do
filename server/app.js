const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const port = 3000;

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`This app running on port ${port} `);
})

const express = require('express')
// const routes = require('./routes')

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.json({message: "hello"})
})

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})
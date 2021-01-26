const express = require('express')
const mongoose = require('mongoose')
const port = 3000

const app = express()

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
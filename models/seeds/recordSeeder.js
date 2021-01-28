const mongoose = require('mongoose')
const Record = require('../record')
const data = require('./data.json')

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')

  Record.create(data.records)

  console.log('done')
})
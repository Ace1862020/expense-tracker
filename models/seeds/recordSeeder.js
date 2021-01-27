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

  data.records.forEach(record => {
    Record.create({
      name: record.name,
      category: record.category,
      date: record.date,
      amount: record.amount,
      icon: record.icon
    })
  })

  console.log('done')
})
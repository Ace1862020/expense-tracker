const mongoose = require('mongoose')
const Record = require('../record')

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Record.create({
    name: 'name-1',
    category: 'category-1',
    date: 'day1',
    amount: 100
  })
  console.log('done')
})
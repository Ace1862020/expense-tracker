const db = require('../../config/mongoose')
const Record = require('../record')
const data = require('./data.json')

db.once('open', () => {
  console.log('mongodb connected to the record data!')

  Record.create(data.records)

  console.log('done')
})
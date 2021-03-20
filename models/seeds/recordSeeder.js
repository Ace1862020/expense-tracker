const db = require('../../config/mongoose')
const Record = require('../record')
const recordList = require('../../public/json/record.json')

db.once('open', () => {
  console.log('mongodb connected to the record data!')

  Record.create(recordList.records)

  console.log('Record done')
  return db.close()
})
  .then(() => {
    console.log('Record connection close.')
  })
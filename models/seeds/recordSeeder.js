const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const recordList = require('../../public/json/record.json').records

const SEED_USER = [
  {
    name: 'UserOne',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'UserTwo',
    email: 'user2@example.com',
    password: '12345678'
  }
]
const count = 5

db.once('open', async () => {
  console.log('mongodb connected to the record data!')

  await new Promise((resolve) => {
    SEED_USER.forEach((seeder, index) => {
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seeder.password, salt))
        .then(hash => User.create({
          name: seeder.name,
          email: seeder.email,
          password: hash,
        }))

        .then(user => {
          const userId = user._id
          return Promise.all(Array.from({ length: count }, async (_, i) => {
            return Record.create({
              ...recordList[i + index * count],
              userId
            })
          }))
            .then(() => {
              console.log(`Record ${index + 1} connection done`)
              if (index === SEED_USER.length - 1) resolve()
            })
        })
    })
  })
  process.exit()
})
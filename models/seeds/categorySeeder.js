const mongoose = require('mongoose')
const Category = require('../category')

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')

  Category.create(
    { category: 'living', category_cn: '家居物業', icon: 'fas fa-home' },
    { category: 'traffic', category_cn: '交通出行', icon: 'fas fa-shuttle-van' },
    { category: 'entertainment', category_cn: '休閒娛樂', icon: 'fas fa-grin-beam' },
    { category: 'foods', category_cn: '餐飲食品', icon: 'fas fa-utensils' },
    { category: 'other', category_cn: '其他', icon: 'fas fa-pen' },
  )
})


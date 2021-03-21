if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')
const categoryList = require('../../public/json/category.json')

db.once('open', () => {
  console.log('mongodb connected to the category!')

  const categorys = []

  categoryList.forEach(item => {
    categorys.push(
      Category.create({
        category: item.category,
        category_cn: item.category_cn,
        icon: item.icon,
        url: item.url
      })
    )
  })

  Promise.all(categorys)
    .then(() => {
      db.close()
    })

  console.log('Category done')
})



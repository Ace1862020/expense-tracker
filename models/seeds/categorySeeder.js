const db = require('../../config/mongoose')
const Category = require('../category')
const categoryList = require('../../public/json/category.json')


db.once('open', () => {
  console.log('mongodb connected to the category!')

  categoryList.forEach(data => {
    Category.create({
      category: data.category,
      category_cn: data.category_cn,
      icon: data.icon,
      url: data.url
    })
  })

  console.log('Category done')
})
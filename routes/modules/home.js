// home.js 首頁路由
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const totalAmount = require('../../public/total')



// Index route
router.get('/', (req, res) => {
  let categorys = []
  //const userId = req.user._id 
  Category.find()
    .lean()
    .then(items => {
      categorys.push(...items)
      //console.log(categorys)
    })
    .then(() => {
      Record.find()
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
          const total = totalAmount(records)
          res.render('index', { records, total, categorys })
        })
    })
    .catch(error => console.error(error))
})

// filter route
router.get('/filter/:category', (req, res) => {
  //const userId = req.user._id
  const category = req.params.category
  Record.find({ category })
    .lean()
    .then(records => {
      const total = totalAmount(records)
      res.render('index', { records, total })
    })
    .catch(error => console.error(error))
})

module.exports = router
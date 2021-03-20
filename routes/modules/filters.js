// home.js 首頁路由
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const totalAmount = require('../../public/total')
const dateGroup = require('../../public/dateGroup')

router.get('/', (req, res) => {

  const categorySelect = req.query.category
  const dateSelect = req.query.date
  let categorys = []

  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((items) => {
      categorys.push(...items)
    })

  Record.find()
    .lean()
    .then((records) => {
      const dates = dateGroup(records)
      if (dates.length > 0) {
        dates.forEach(item => {
          item.selectDateValue = dateSelect
        })
      }

      categorys.forEach(item => {
        item.selectCategoryValue = categorySelect
      })

      //console.log('dateSelect :', dateSelect)
      //console.log('categorySelect :', categorySelect)

      records = records.filter((item) => {
        if (categorySelect !== '' && dateSelect !== '') {
          return item.category === categorySelect && item.date === dateSelect
        } else if (categorySelect !== '' && dateSelect === '') {
          return item.category === categorySelect
        } else if (categorySelect === '' && dateSelect !== '') {
          return item.date === dateSelect
        } else if (categorySelect === '' && dateSelect === '') {
          return true
        }
      })

      res.render('index', { records, categorys: categorys, dates: dates, total: totalAmount(records) })

    })
})



module.exports = router
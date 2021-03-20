// home.js 首頁路由
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const totalAmount = require('../../public/total')
const dateGroup = require('../../public/dateGroup')


// Index route
router.get('/', (req, res) => {
  let categorys = []
  //const userId = req.user._id 
  Category.find()
    .lean()
    .then(items => {
      categorys.push(...items)
    })
    .then(() => {
      Record.find()
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
          const total = totalAmount(records)
          const dates = dateGroup(records)
          res.render('index', { records, total, categorys, dates })
        })
    })
    .catch(error => console.error(error))
})

module.exports = router
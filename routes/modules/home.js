// home.js 首頁路由
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const totalAmount = require('../../public/total')

// Index route
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      const total = totalAmount(records)
      res.render('index', { records, total })
    })
    .catch(error => console.error(error))
})

// filter route
router.get('/filter/:category', (req, res) => {
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
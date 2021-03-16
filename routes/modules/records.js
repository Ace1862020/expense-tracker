// records.js
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const generateIcon = require('../../public/icon')
const categoryTranslater = require('../../public/translater')



// Create route
router.get('/new', (req, res) => {
  let categorys = []
  Category.find()
    .lean()
    .then(items => {
      categorys.push(...items)
    })
    .then(() => {
      res.render('new', { categorys })
    })
})

router.post('/', (req, res) => {
  const { name, date, category, amount, merchent } = req.body
  const icon = generateIcon(category)
  const category_cn = categoryTranslater(category)
  return Record.create({ name, date, category, category_cn, amount, icon })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Edit route
router.get('/:id', (req, res) => {
  let categorys = []
  const id = req.params.id
  Category.find()
    .lean()
    .then(items => {
      categorys.push(...items)
    })
    .then(() => {
      return Record.findById(id)
        .lean()
        .then((record) => res.render('edit', { record, categorys }))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount, merchent } = req.body
  const icon = generateIcon(category)
  const category_cn = categoryTranslater(category)
  Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.merchent = merchent
      record.category_cn = category_cn
      record.icon = icon
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Delete route
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
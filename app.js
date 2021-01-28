const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const port = 3000

const Record = require('./models/record')
const Category = require('./models/category')
const generateIcon = require('./public/icon')
const totalAmount = require('./public/total')
const categoryTranslater = require('./public/translater')
const app = express()

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

// select category helper
Handlebars.registerHelper('ifEqual', function (category, categoryName, options) {
  if (category === categoryName) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

// Index route
app.get('/', (req, res) => {
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
app.get('/filter/:category', (req, res) => {
  const category = req.params.category
  //const category_cn = categoryTranslater(category)
  Record.find({ category })
    .lean()
    .then(records => {
      const total = totalAmount(records)
      res.render('index', { records, total })
    })
    .catch(error => console.error(error))
})

// Create route
app.get('/records/new', (req, res) => {
  res.render('new')
})

app.post('/records', (req, res) => {
  const { name, date, category, amount } = req.body
  const icon = generateIcon(category)
  const category_cn = categoryTranslater(category)
  return Record.create({ name, date, category, category_cn, amount, icon })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Edit route
app.get('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  const icon = generateIcon(category)
  const category_cn = categoryTranslater(category)
  Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.category_cn = category_cn
      record.amount = amount
      record.icon = icon
      return record.save()
    })
    .then(record => res.redirect('/'))
    .catch(error => console.log(error))
})

// Delete route
app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
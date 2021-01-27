const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000

const Record = require('./models/record')
const Category = require('./models/category')
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

// Index route
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => {
      console.error(error => console.error(error))
    })
})

// Create route
app.get('/records/new', (req, res) => {
  res.render('new')
})

app.post('/records', (req, res) => {
  const { name, date, category, amount } = req.body
  return Record.create({
    name, date, category, amount
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
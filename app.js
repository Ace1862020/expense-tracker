const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const port = 3000

const routes = require('./routes')

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

app.use(
  express.static('public'),
  bodyParser.urlencoded({ extended: true }),
  methodOverride('_method'),
  routes)


// select category helper
Handlebars.registerHelper('ifEqual', function (category, categoryName, options) {
  if (category === categoryName) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
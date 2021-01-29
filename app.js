const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')
const port = 3000
const app = express()

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
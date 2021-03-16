const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set session
app.use(session({
  secret: 'ExpenseTrackerTicker',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use(routes)

// select category helper
Handlebars.registerHelper('ifEqual', function (category, categoryName, options) {
  if (category === categoryName) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
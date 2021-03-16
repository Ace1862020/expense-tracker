const express = require('express')
const router = express.Router()

const User = require('../../models/user')

// Login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

// Register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exists.')
      return res.render('register', { name, email, password, confirmPassword })
    }
    return User.create({
      name, email, password
    })
      .then(() => res.redirect('login'))
      .catch(error => console.log(error))
  })
})

module.exports = router
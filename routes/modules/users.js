const express = require('express')
const router = express.Router()

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

})

module.exports = router
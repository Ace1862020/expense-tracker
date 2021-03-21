const express = require('express')
const router = express.Router()

const passport = require('passport')
const User = require('../../models/user')

// Login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  ailureFlash: true,
  successRedirect: '/',
  failureRedirect: '/users/login'
}))


// Register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'All columns are required !' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: 'The password does not match the confirm password !' })
  }

  if (errors.length) {
    return res.render('register', {
      errors, name, email, password, confirmPassword
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: 'This Email has already been registered !' })
      return res.render('register', { errors, name, email, password, confirmPassword })
    }
    return User.create({
      name, email, password
    })
      .then(() => {
        req.flash('success_msg', 'registration success.')
        return res.redirect('/login')
      })
      .catch(error => console.log(error))
  })
})


// Logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have successfully logout.')
  res.redirect('/users/login')
})

module.exports = router
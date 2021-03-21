const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  // initialization passport module
  app.use(passport.initialize())
  app.use(passport.session())
  // set LocalStrategy module
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
  },
    (req, email, password, done) => {
      User.findOne({ email }).then(user => {
        if (!user) {
          req.flash('warning_msg', 'This Email s not registered！')
          return done(null, false)
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              req.flash('warning_msg', 'Email or Password incorrect.')
              return done(null, false)
            }
            return done(null, user)
          })
      })
        .catch(err => done(err, false))
    }))
  // set serialize & deserialize
  passport.serializeUser((user, done) => {
    // console.log('user:', user)
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
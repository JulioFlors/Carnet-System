const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

import User from '../models/Users'

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {

  // Convert username to Uppercase 
  username = username.toUpperCase();

  // Match username's User
  await User.findOne({
    where: {
      username
    }
  }).then(async (user) => {

    // Match Password's User
    const match = await user.matchPassword(password);
    if (match) {
      return done(null, user);
    } else {
      return done(null, false, {
        message: 'Incorrect Password.'
      });
    }

  }).catch((err) => {
    return done(null, false, {
      message: 'Not User found.'
    });
  });

}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    return done(null, user);
  }).catch((err) => {
    console.log(err);
    return done(null, false, {
      message: 'Not User found from deserializeUser'
    });
  });
});
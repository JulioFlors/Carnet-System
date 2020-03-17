const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

import User from '../models/Users'

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    await User.findOne({
        where: {
            username
        }
    }).then(async function (user) {
        if (!user) {
            return done(null, false, {
                message: 'Not User found.'
            });
        } else {
            // Match Password's User 
            const match = await user.matchPassword(password);

            if (match) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Incorrect Password.'
                });
            }
        }
    })
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findByPk(id, (err, user) => {
        done(err, user);
    });
});
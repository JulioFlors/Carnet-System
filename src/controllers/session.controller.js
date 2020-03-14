import User from '../models/Users';

import passport from 'passport'

export async function signUp(req, res) {

    const errors = [];

    const {
        username,
        password,
        confirm,
        permission
    } = req.body;

    if ((permission != 'Admin') && (permission != 'Edit') && (permission != 'Read')) {
        errors.push({
            text: 'Invalid permissions.'
        });
    }

    if (password != confirm) {
        errors.push({
            text: 'Passwords do not match.'
        });
    }

    if (password.length < 4) {
        errors.push({
            text: 'Passwords must be at least 4 characters.'
        });
    }

    if (errors.length > 0) {
        res.render('session/signup', {
            errors,
            username,
            password
        })
    } else {
        // Look for UserName coincidence
        const valiUserName = await User.findAll({
            where: {
                username
            }
        });

        if (valiUserName.length > 0) {
            req.flash('error_msg', 'The Username is already in use.');
            res.redirect('/signup');
        } else {

            await User.create({
                username,
                password,
                permission
            }, {
                fields: ['username', 'password', 'permission']
            }).then((result) => {
                req.flash('success_msg', 'You are registered');
                res.redirect('/signin');
            }).catch((err) => {
                console.log(err);
                req.flash('error_msg', 'Something went wrong creating user');
                res.render('session/signup', {
                    username,
                    password
                })
            });
        }
    }
};

export async function renderSignUpForm(req, res) {
    res.render('session/signup')
};

export async function renderSignInForm(req, res) {
    res.render('session/signin')
};

export const signIn = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
    failureFlash: true
});

export async function logout(req, res) {
    res.send('logout')
};
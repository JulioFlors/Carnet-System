// Models
import User from '../models/Users';

// Modules
import passport from 'passport'

export async function renderSignUpForm(req, res) {
    return res.render('session/signup')
};

export async function renderSignInForm(req, res) {
    if (req.user) return res.redirect('/')
    return res.render('session/signin')
};

export const signIn = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
    failureFlash: true
});

export async function logout(req, res) {
    req.logout();
    req.flash("success_msg", "You are logged out now.");
    res.redirect('/signin');
};

export async function signUp(req, res) {
    try {
        const {
            usuario,
            password,
            confirm,
            permission
        } = req.body;

        // Convert username to Uppercase 
        const username = usuario.toUpperCase();

        const errors = [];

        if ((permission != 'Admin') && (permission != 'Edit') && (permission != 'Read')) {
            errors.push({
                text: 'Permisos inválidos'
            });
        }

        if (password != confirm) {
            errors.push({
                text: 'Las contraseñas no coinciden'
            });
        }

        if (password.length < 4) {
            errors.push({
                text: 'Las contraseñas deben tener al menos 4 caracteres'
            });
        }

        if (errors.length > 0) {
            return res.render('session/signup', {
                errors,
                usuario,
                password,
                permission
            })
        } else {
            // Look for UserName coincidence
            const valiUserName = await User.findAll({
                where: {
                    username
                }
            });

            if (valiUserName.length > 0) {
                req.flash('error_msg', 'El nombre de usuario ya está en uso');
                res.locals.error_msg = req.flash('error_msg');
                return res.render('session/signup', {
                    usuario,
                    password,
                    permission
                })
            } else {
                // Saving a New User
                const user = await User.create({
                    username,
                    password,
                    permission
                }, {
                    fields: ['username', 'password', 'permission']
                });

                if (user) {
                    req.flash('success_msg', 'Usuario registrado exitosamente');
                    return res.redirect('/users');
                } else {
                    req.flash('error_msg', 'No se pudo registrar al usuario');
                    res.locals.error_msg = req.flash('error_msg');
                    return res.render('session/signup', {
                        usuario,
                        password,
                        permission
                    })
                }
            }
        }
    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Error al intentar registrar el usuario');
        res.locals.error_msg = req.flash('error_msg');
        return res.render('session/signup', {
            usuario,
            password,
            permission
        })
    }
};
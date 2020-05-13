import User from '../models/Users';

export async function renderUsers(req, res) {
    try {
        const data = await User.findAll({
            order: [
                ['id', 'ASC'],
            ]
        });

        if (data) {
            return res.render('users/all-users', {
                data
            });
        } else {
            req.flash('error_msg', 'no se pudo obtener los usuarios');
            res.locals.error_msg = req.flash('error_msg');
            return res.render('users/all-users');
        }

    } catch (error) {
        console.log(error);

        req.flash('error_msg', 'Error al intentar obtener los Usuarios');
        res.locals.error_msg = req.flash('error_msg');

        return res.render('users/all-users');
    }
};

export async function renderEdit(req, res) {
    try {
        const {
            id
        } = req.params;

        const data = await User.findOne({
            where: {
                id
            }
        });

        if (data) {
            return res.render('users/edit-users', {
                id: data.id,
                usuario: data.username,
                permission: data.permission
            });
        } else {
            req.flash('error_msg', 'No se pudo obtener los datos del usuario');
            res.locals.error_msg = req.flash('error_msg');
            return res.render("users/all-users");
        }
    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Error al traer los datos del usuario');
        res.locals.error_msg = req.flash('error_msg');
        return res.render("users/all-users");
    }
};

export async function updateUser(req, res) {
    try {
        const {
            id
        } = req.params;

        const {
            usuario,
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

        if (errors.length > 0) {
            return res.render('users/edit-users', {
                errors,
                usuario,
                permission
            })
        } else {

            const oldUsername = await User.findOne({
                where: {
                    id
                }
            });

            // Look for Username coincidence
            const valiUsername = await User.findAll({
                where: {
                    username
                }
            });

            if ((valiUsername.length > 0) && (oldUsername.dataValues.username != username)) {
                req.flash('error_msg', 'El nombre de usuario ya está en uso.');
                res.locals.error_msg = req.flash('error_msg');
                return res.render('users/edit-users', {
                    usuario,
                    permission
                })
            } else {

                // Updating the User
                const user = await User.update({
                    username,
                    permission
                }, {
                    where: {
                        id
                    }
                });

                if (user) {
                    req.flash('success_msg', 'Usuario actualizado exitosamente');
                    return res.redirect('/users');
                } else {
                    req.flash('error_msg', 'No se pudo actualizar el Usuario');
                    res.locals.error_msg = req.flash('error_msg');
                    return res.render('users/edit-users', {
                        usuario,
                        permission
                    })
                }
            }
        }
    } catch (error) {
        console.log(error);

        req.flash('error_msg', 'Error al intentar actualizar el Usuario');
        res.locals.error_msg = req.flash('error_msg');

        return res.render('users/edit-users', {
            usuario,
            permission
        })
    }
};

export async function deleteUser(req, res) {
    try {
        const {
            id
        } = req.params;

        const user = await User.destroy({
            where: {
                id
            }
        })

        if (user) {
            req.flash('success_msg', 'Usuario eliminado exitosamente');
            return res.redirect('/users');
        } else {
            req.flash('error_msg', 'No se pudo eliminar el Usuario');
            return res.redirect('/users');
        }

    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Error al intentar eliminar el Usuario');
        return res.redirect('/users');
    }
}
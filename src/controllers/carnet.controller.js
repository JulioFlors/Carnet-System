import Path from 'path'
import {
    unlink
} from 'fs-extra'
import Rac from '../models/Rac'
import Staff from '../models/Staff'
import Photo from '../models/Photos'
import Carnet from '../models/Carnets'
import Position from '../models/Positions'
import Department from '../models/Departments'

export function renderFormCarnet(req, res) {
    res.render('carnet/carnet-staff')
};

// export function printCarnet(req, res) {
//     res.render('carnet/carnet-print')
// };

export async function getData(req, res) {
    try {
        const {
            cedula
        } = req.body;

        // Search matches by cedula
        const staff = await Staff.findOne({
            where: {
                cedula
            }
        });

        if (staff) {

            const data = await Rac.findOne({
                include: [{
                        model: Staff,
                        include: [{
                            model: Carnet
                        }]
                    },
                    {
                        model: Department
                    },
                    {
                        model: Position
                    }
                ],
                where: {
                    cedula
                },
                attributes: ['cedula', 'first_name', 'last_name']
            });

            // Search matches by cedula
            const photo = await Photo.findOne({
                where: {
                    cedula
                }
            });

            if (photo) return res.render('carnet/carnet-staff', {
                cedula: data.cedula,
                firstname: data.first_name,
                lastname: data.last_name,
                department: data.department.description,
                position: data.position.description,
                expiration: data.staff.carnet.date_of_expiration,
                blood: data.staff.blood_type,
                photo: photo.path
            })
            else {
                return res.render('carnet/carnet-staff', {
                    cedula: data.cedula,
                    firstname: data.first_name,
                    lastname: data.last_name,
                    department: data.department.description,
                    position: data.position.description,
                    expiration: data.staff.carnet.date_of_expiration,
                    blood: data.staff.blood_type,
                });
            }
        } else {
            req.flash('error_msg', 'La persona no ha sido encontrada');
            return res.redirect('/carnet/staff');
        }

    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Error al intentar encontrar a la persona');
        return res.redirect('/carnet/staff');
    }
}; // tengo el peo de que al renderizar en las funciones uploadPhoto y createCarnet 
// (que estan en peticiones post me cambian la URL)

export async function uploadPhoto(req, res) {

    const {
        cedula,
        firstname,
        lastname,
        department,
        position,
        expiration,
        blood
    } = req.body;

    if (req.file) { // Vas a cargar la foto
        const {
            filename,
            originalname,
            mimetype,
            size
        } = req.file;

        const path = '/img/uploads/' + filename;
        const user_permission = req.user.dataValues.permission;
        const errors = [];

        try {
            if (!path) {
                errors.push({
                    text: 'No se pudo obtener el path de la Foto'
                });
            }

            // Search matches by cedula
            const staff = await Staff.findOne({
                where: {
                    cedula
                }
            });

            if (!staff) {
                errors.push({
                    text: 'Cedula invalida'
                });
            }

            if (user_permission === 'Read') {
                // Search matches by Department
                const Dpto = await Department.findOne({
                    where: {
                        description: department
                    }
                });

                if (!Dpto) {
                    errors.push({
                        text: 'Departamento invalido'
                    });
                }

                // Search matches by Position
                const Cargo = await Position.findOne({
                    where: {
                        description: position
                    }
                });

                if (!Cargo) {
                    errors.push({
                        text: 'Cargo invalido'
                    });
                }
            }

            if (errors.length > 0) {
                try {

                    // we delete from system
                    await unlink(Path.resolve('./src/public/' + path));

                    req.flash('success_msg', 'Se elimino la foto del sistema correctamente');
                    res.locals.success_msg = req.flash('success_msg');

                    return res.render('carnet/carnet-staff', {
                        errors,
                        cedula,
                        firstname,
                        lastname,
                        department,
                        position,
                        expiration,
                        blood
                    });
                } catch (error) {
                    req.flash('error_msg', 'Error: No se pudo eliminar la Foto del Sistema, por favor eliminar manualmente!');
                    res.locals.error_msg = req.flash('error_msg');
                    return res.render('carnet/carnet-staff', {
                        cedula,
                        firstname,
                        lastname,
                        department,
                        position,
                        expiration,
                        blood
                    })
                }
            } else {

                // current photo in the database
                const oldPhoto = await Photo.findOne({
                    where: {
                        cedula
                    }
                });

                if (oldPhoto) { // if the person already has a photo

                    // we update photo from data base 
                    const updatedPhoto = await Photo.update({
                        filename,
                        path,
                        originalname,
                        mimetype,
                        size
                    }, {
                        where: {
                            cedula
                        }
                    });

                    if (updatedPhoto) { // if the photo was updated
                        try {
                            req.flash('success_msg', 'Foto actualizada con éxito');
                            res.locals.success_msg = req.flash('success_msg');

                            // we delete from system
                            await unlink(Path.resolve('./src/public/' + oldPhoto.path));

                            return res.render('carnet/carnet-staff', {
                                photo: path,
                                cedula,
                                firstname,
                                lastname,
                                department,
                                position,
                                expiration,
                                blood
                            })
                        } catch (error) {
                            req.flash('error_msg', 'Error: No se pudo eliminar la Foto Anterior del Sistema. Revisar si se debe a que no Existia o si se debe eliminar manualmente!');
                            res.locals.error_msg = req.flash('error_msg');
                            return res.render('carnet/carnet-staff', {
                                photo: path,
                                cedula,
                                firstname,
                                lastname,
                                department,
                                position,
                                expiration,
                                blood
                            })
                        }
                    } else {
                        try {
                            req.flash('error_msg', 'No se pudo actualizar la foto');
                            res.locals.error_msg = req.flash('error_msg');

                            // we delete from system
                            await unlink(Path.resolve('./src/public/' + path));

                            return res.render('carnet/carnet-staff', {
                                photo: oldPhoto.path,
                                cedula,
                                firstname,
                                lastname,
                                department,
                                position,
                                expiration,
                                blood
                            })
                        } catch (error) {
                            req.flash('error_msg', 'Error: La nueva foto se subio al sistema, por favor eliminar manualmente!');
                            res.locals.error_msg = req.flash('error_msg');
                            return res.render('carnet/carnet-staff', {
                                photo: oldPhoto.path,
                                cedula,
                                firstname,
                                lastname,
                                department,
                                position,
                                expiration,
                                blood
                            })
                        }
                    }
                } else { //if the person does not have a photo

                    const createdPhoto = await Photo.create({
                        cedula,
                        filename,
                        path,
                        originalname,
                        mimetype,
                        size
                    }, {
                        fields: ['cedula', 'filename', 'path', 'originalname', 'mimetype', 'size']
                    });

                    if (createdPhoto) { // if the photo was created
                        req.flash('success_msg', 'Foto guardada con éxito');
                        res.locals.success_msg = req.flash('success_msg');
                        console.log(createdPhoto);
                        return res.render('carnet/carnet-staff', {
                            photo: path,
                            cedula,
                            firstname,
                            lastname,
                            department,
                            position,
                            expiration,
                            blood
                        })
                    } else {
                        try {
                            req.flash('error_msg', 'La foto no se pudo guardar en la base de datos');
                            res.locals.error_msg = req.flash('error_msg');

                            // we delete from system
                            await unlink(Path.resolve('./src/public/' + path));

                            return res.render('carnet/carnet-staff', {
                                photo: oldPhoto.path,
                                cedula,
                                firstname,
                                lastname,
                                department,
                                position,
                                expiration,
                                blood
                            })
                        } catch (error) {
                            req.flash('error_msg', 'Error: La nueva foto se subio al sistema, por favor eliminar manualmente!');
                            res.locals.error_msg = req.flash('error_msg');
                            return res.render('carnet/carnet-staff', {
                                photo: oldPhoto.path,
                                cedula,
                                firstname,
                                lastname,
                                department,
                                position,
                                expiration,
                                blood
                            })
                        }
                    }
                }
            }
        } catch (error) {
            try {
                console.log(error)
                req.flash('error_msg', 'Error: no se pudo guardar la foto');
                res.locals.error_msg = req.flash('error_msg');

                // we delete from system
                await unlink(Path.resolve('./src/public/' + path));

                return res.render('carnet/carnet-staff', {
                    cedula,
                    firstname,
                    lastname,
                    department,
                    position,
                    expiration,
                    blood
                })

            } catch (error) {
                req.flash('error_msg', 'Error: La nueva foto se subio al sistema, por favor eliminar manualmente!');
                res.locals.error_msg = req.flash('error_msg');
                return res.render('carnet/carnet-staff', {
                    cedula,
                    firstname,
                    lastname,
                    department,
                    position,
                    expiration,
                    blood
                })
            }
        }
    } else { // Vas a pedir que cargue una foto
        req.flash('error_msg', 'Adjunte foto para continuar');
        res.locals.error_msg = req.flash('error_msg');

        return res.render('carnet/carnet-staff', {
            cedula,
            firstname,
            lastname,
            department,
            position,
            expiration,
            blood
        });
    }
};

export async function createCarnet(req, res) {

    const id_user = req.user.dataValues.id;
    const user_permission = req.user.dataValues.permission;

    const {
        cedula,
        firstname,
        lastname,
        department,
        position,
        expiration,
        blood
    } = req.body;

    const date_of_expiration = expiration;
    const errors = [];

    try {
        // Search staff by cedula matches
        const staff = await Staff.findOne({
            where: {
                cedula
            }
        });

        if (!staff) {
            errors.push({
                text: 'Cedula invalida'
            });
        } else {
            // Search photo by cedula matches
            const photo = await Photo.findOne({
                where: {
                    cedula
                }
            });

            if (!photo) {
                errors.push({
                    text: 'Esta persona no posee una Foto'
                });
            }
        }

        if (user_permission === 'Read') {
            // Search Department by description matches
            const Dpto = await Department.findOne({
                where: {
                    description: department
                }
            });
            if (!Dpto) {
                errors.push({
                    text: 'Departamento invalido'
                });
            }

            // Search Position by description matches
            const Cargo = await Position.findOne({
                where: {
                    description: position
                }
            });
            if (!Cargo) {
                errors.push({
                    text: 'Cargo invalido'
                });
            }
        }

        if (errors.length > 0) {
            if (photo) {
                return res.render('carnet/carnet-staff', {
                    errors,
                    photo: photo.path,
                    cedula,
                    firstname,
                    lastname,
                    department,
                    position,
                    expiration,
                    blood
                })
            } else {
                return res.render('carnet/carnet-staff', {
                    errors,
                    cedula,
                    firstname,
                    lastname,
                    department,
                    position,
                    expiration,
                    blood
                })
            }
        } else {

            // Search photo by cedula matches
            const photo = await Photo.findOne({
                where: {
                    cedula
                }
            });

            // Search Carnet by cedula matches
            const carnet = await Carnet.findOne({
                where: {
                    cedula
                }
            });

            if (carnet) { // if the Carnet exist

                const updatedCarnet = await Carnet.update({
                    date_of_expiration,
                    id_user
                }, {
                    where: {
                        cedula
                    }
                });

                if (updatedCarnet) {
                    req.flash('success_msg', 'El carnet se actualizó exitosamente');
                    res.locals.success_msg = req.flash('success_msg');
                    return res.render('carnet/carnet-staff', {
                        photo: photo.path,
                        cedula,
                        firstname,
                        lastname,
                        department,
                        position,
                        expiration,
                        blood
                    })
                } else {
                    req.flash('error_msg', 'No se pudo actualizar el carnet');
                    res.locals.error_msg = req.flash('error_msg');
                    return res.render('carnet/carnet-staff', {
                        photo: photo.path,
                        cedula,
                        firstname,
                        lastname,
                        department,
                        position,
                        expiration,
                        blood
                    })
                }
            } else { // if the person does not have a Carnet
                const createdCarnet = await Carnet.create({
                    cedula,
                    date_of_expiration,
                    id_user
                }, {
                    fields: ['cedula', 'date_of_expiration', 'id_user']
                });

                if (createdCarnet) {
                    req.flash('success_msg', 'El carnet se creo exitosamente');
                    res.locals.success_msg = req.flash('success_msg');
                    return res.render('carnet/carnet-staff', {
                        photo: photo.path,
                        cedula,
                        firstname,
                        lastname,
                        department,
                        position,
                        expiration,
                        blood
                    })
                } else {
                    req.flash('error_msg', 'No se pudo crear el carnet');
                    res.locals.error_msg = req.flash('error_msg');
                    return res.render('carnet/carnet-staff', {
                        photo: photo.path,
                        cedula,
                        firstname,
                        lastname,
                        department,
                        position,
                        expiration,
                        blood
                    })
                }
            }
        }
    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Error: Se produjo un error inesperado');
        res.locals.error_msg = req.flash('error_msg');
        return res.render('carnet/carnet-staff', {
            cedula,
            firstname,
            lastname,
            department,
            position,
            expiration,
            blood
        })
    }
}
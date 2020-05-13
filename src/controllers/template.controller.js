import Template from '../models/Templates'
import Path from 'path'
import fs from 'fs'

export async function renderAddTemplate(req, res) {
    return res.render('templates/add-template')
}

export async function renderTemplates(req, res) {
    try {
        const data = await Template.findAll({
            order: [
                ['orientation', 'ASC'],
            ]
        });

        if (data) {
            return res.render('templates/all-templates', {
                data
            });
        } else {
            req.flash('error_msg', 'no se pudo obtener las plantillas');
            res.locals.error_msg = req.flash('error_msg');
            return res.render('templates/all-templates');
        }
    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Error al intentar obtener las plantillas');
        res.locals.error_msg = req.flash('error_msg');
        return res.render('templates/all-templates');
    }
}

export async function deleteTemplate(req, res) {

    try {
        const {
            id
        } = req.params;

        const ruta = await Template.findOne({
            where: {
                id
            }
        })

        if (ruta) {
            const destroyed = await Template.destroy({
                where: {
                    id
                }
            })

            if (destroyed) {
                try {
                    // we delete from system 
                    fs.unlinkSync(Path.resolve('./src/public' + ruta.path));
                    req.flash('success_msg', 'Plantilla eliminada con éxito');
                    return res.redirect('/templates');
                } catch (error) {
                    req.flash('error_msg', 'Error: La plantilla no se pudo eliminar del Sistema, hacerlo manualmente!');
                    return res.redirect('/templates');
                }
            } else {
                req.flash('error_msg', 'No se pudo eliminar la plantilla');
                return res.redirect('/templates');
            }
        } else {
            req.flash('error_msg', 'No se pudo obtener los datos de la plantilla');
            return res.redirect('/templates');
        }
    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Error al intentar eliminar la plantilla');
        return res.redirect('/templates');
    }
}

export async function createTemplate(req, res) {

    const {
        title,
        description,
        orientation
    } = req.body;

    const {
        filename,
        originalname,
        mimetype,
        size
    } = req.file;

    const path = '/img/templates/' + filename;

    try {
        // Look for UserName coincidence
        const valiTitle = await Template.findAll({
            where: {
                title
            }
        });

        if (valiTitle.length > 0) {
            req.flash('error_msg', 'Ese titulo ya está en uso');
            res.locals.error_msg = req.flash('error_msg');
            return res.render('templates/add-template', {
                title,
                description,
                orientation
            })
        } else {
            // Saving a New Template
            const template = await Template.create({
                title,
                description,
                orientation,
                filename,
                path,
                originalname,
                mimetype,
                size
            }, {
                fields: ['title', 'description', 'orientation', 'filename', 'path', 'originalname', 'mimetype', 'size']
            });

            if (template) {
                try {
                    fs.renameSync(Path.resolve('./src/public/img/uploads/' + filename), Path.resolve('./src/public/img/templates/' + filename));
                    req.flash('success_msg', 'Plantilla guardada con éxito')
                    return res.redirect('/templates')
                } catch (error) {
                    console.log(error);
                    req.flash('error_msg', 'Error: la plantilla se guardo en la carpeta equivocada. Mover Manualmente a la carpeta /img/templates')
                    return res.redirect('/templates')
                }
            } else {
                try {
                    req.flash('error_msg', 'La plantilla no se pudo guardar en la base de datos');
                    res.locals.error_msg = req.flash('error_msg');

                    // we delete from system 
                    fs.unlinkSync(Path.resolve('./src/public/img/uploads/' + filename));
                    return res.render('templates/add-template', {
                        title,
                        description,
                        orientation
                    })
                } catch (error) {
                    req.flash('error_msg', 'Error: La nueva plantilla se subio al sistema, por favor eliminar manualmente de ../public/img/uploads');
                    res.locals.error_msg = req.flash('error_msg');
                    return res.redirect('/templates');
                }
            }
        }
    } catch (error) {
        try {
            console.log(error);
            req.flash('error_msg', 'Error: no se pudo guardar la plantilla en la base de datos');
            res.locals.error_msg = req.flash('error_msg');

            // we delete from system 
            fs.unlinkSync(Path.resolve('./src/public/img/uploads/' + filename));
            return res.render('templates/add-template', {
                title,
                description,
                orientation
            })

        } catch (error) {
            req.flash('error_msg', 'Error: La nueva plantilla se subio a la carpeta uploads, por favor eliminar manualmente!');
            res.locals.error_msg = req.flash('error_msg');
            return res.render('templates/add-template', {
                title,
                description,
                orientation
            })
        }
    }
}
import Photo from '../../models/Photos'
import path from 'path'
import {
    unlink
} from 'fs-extra'

export async function uploadPhoto(req, res) {

    let cedula = req.body;

    let filename = req.file.filename;
    let path = '/img/uploads/' + req.file.filename;
    let originalname = req.file.originalname;
    let mimetype = req.file.mimetype;
    let size = req.file.size;

    await Photo.create({
        cedula,
        filename,
        path,
        originalname,
        mimetype,
        size
    }, {
        fields: ['cedula', 'filename', 'path', 'originalname', 'mimetype', 'size']
    }).then((result) => {
        res.json({
            message: 'Photo Create Successfuly',
            data: result
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    });
};

export async function getPhoto(req, res) {

    let cedula = req.params;

    await User.findAll({

        where: {
            cedula
        }

    }).then((result) => {
        res.json({
            data: result
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    });
}

export async function deletePhoto(req, res) {


    let cedula = req.params;

    let photo = await Photo.destroy({
        where: {
            cedula
        }
    }).then((result) => {

        unlink(path.resolve('./src/public' + photo.path));

        res.json({
            message: 'Photo Deleted Successfuly'
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    });
}
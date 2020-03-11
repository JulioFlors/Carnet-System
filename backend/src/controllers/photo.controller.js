import Photo from '../models/Photos'
import path from 'path'
import {
    unlink
} from 'fs-extra'

export async function deletePhoto(req, res) {

    const {
        cedula
    } = req.params;

    const photo = await Photo.destroy({
        where: {
            cedula
        }
    }).then((result) => {

        unlink(path.resolve('./src/public' + photo.path));

        console.log(result);

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
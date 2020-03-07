import Rac from '../models/Rac'

export async function getRac(req, res) {

    console.log(Rac.associations);

    await Rac.findAll({
        order: [
            ['id', 'ASC'],
        ]
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
};
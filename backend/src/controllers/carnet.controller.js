import Carnet from '../models/Carnets';

export async function createCarnet(req, res) {
    const {
        cedula,
        date_of_issue,
        date_of_expiration,
        id_user
    } = req.body;

    await Carnet.create({
        cedula,
        date_of_issue,
        date_of_expiration,
        id_user
    }, {
        fields: ['cedula', 'date_of_issue', 'date_of_expiration', 'id_user'],
        order: [
            ['id', 'ASC'],
        ]
    }).then((result) => {
        res.json({
            message: 'Carnet Create Successfuly',
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

export async function getCarnets(req, res) {

    console.log(Carnet.associations);

    await Carnet.findAll({
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
    })
};
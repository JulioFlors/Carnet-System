import Foreign_Person from '../models/Foreign_Persons';

export async function getForeign_Persons(req, res) {

    console.log(Foreign_Person.associations);

    await Foreign_Person.findAll({
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
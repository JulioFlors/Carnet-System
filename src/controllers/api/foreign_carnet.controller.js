import Foreign_Carnet from '../../models/Foreign_Carnets';

export async function getForeign_Carnets(req, res) {

    console.log(Foreign_Carnet.associations);

    await Foreign_Carnet.findAll({
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
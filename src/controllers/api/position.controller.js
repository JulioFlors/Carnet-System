import Position from '../../models/Positions'

export async function getPositions(req, res) {

    console.log(Position.associations);

    await Position.findAll({
        order: [
            ['code_pos', 'ASC'],
        ]
    }).then((result) => {
        res.json({
            data: result
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'something goes wrong',
            data: {}
        })
    });
};
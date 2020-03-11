import Staff from '../models/Staff'

export async function getStaff(req, res) {

    console.log(Staff.associations);

    await Staff.findAll({
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
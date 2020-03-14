import Rac from '../../models/Rac'
import Staff from '../../models/Staff'
import Position from '../../models/Positions'
import Department from '../../models/Departments'

export async function getForm(req, res) {

    const {
        id
    } = req.params;

    await Rac.findAll({

        include: [{
            model: Staff,
            attributes: ['blood_type']
        }, {
            model: Department,
            attributes: ['description']
        }, {
            model: Position,
            attributes: ['description']
        }],

        where: {
            cedula: id
        },

        attributes: ['cedula', 'first_name', 'last_name']

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
import Rac from '../models/Rac'
import Staff from '../models/Staff'
import Carnet from '../models/Carnets'
import Position from '../models/Positions'
import Department from '../models/Departments'

export async function getAllStaff(req, res) {

    await Rac.findAll({

        include: [{
                model: Staff,
                attributes: ['blood_type'],
                include: [{
                    model: Carnet,
                    attributes: ['cedula']
                }],
                order: [
                    [Carnet, 'id', 'asc'],
                ],
            },
            {
                model: Department,
                attributes: ['description']
            },
            {
                model: Position,
                attributes: ['description']
            }
        ],

        attributes: ['cedula', 'first_name', 'last_name']

    }).then((data) => {
        res.render('staff/all-staff', {
            data
        });
    }).catch((err) => {
        console.log(err);

        req.flash('error_msg', 'no se pudo obtener personal');
        res.locals.error_msg = req.flash('error_msg');

        res.render('staff/all-staff');
    });
}
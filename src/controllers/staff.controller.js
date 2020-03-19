import Rac from '../models/Rac'
import Staff from '../models/Staff'
import Position from '../models/Positions'
import Department from '../models/Departments'

export async function getAllStaff(req, res) {

    await Rac.findAll({

        include: [{
            model: Staff,
            attributes: ['blood_type'],
        }, {
            model: Department,
            attributes: ['description']
        }, {
            model: Position,
            attributes: ['description']
        }],

        order: [
            ['id', 'ASC'],
        ],

        attributes: ['cedula', 'first_name', 'last_name']

    }).then((result) => {

        res.render('staff/all-staff', {
            data: result
        });
    }).catch((err) => {
        console.log(err);
        req.flash('error_msg', 'could not get staff');
        res.render('staff/all-staff');
    });
}
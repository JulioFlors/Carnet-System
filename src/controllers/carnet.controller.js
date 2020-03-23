import Rac from '../models/Rac'
import Staff from '../models/Staff'
import Carnet from '../models/Carnets'
import Position from '../models/Positions'
import Department from '../models/Departments'


export async function signUp(req, res) {

    const errors = [];

    const {
        usuario,
        password,
        confirm,
        permission
    } = req.body;

    // Convert username to Uppercase 
    const username = usuario.toUpperCase();

    if ((permission != 'Admin') && (permission != 'Edit') && (permission != 'Read')) {
        errors.push({
            text: 'Invalid permissions.'
        });
    }

    if (password != confirm) {
        errors.push({
            text: 'Passwords do not match.'
        });
    }

    if (password.length < 4) {
        errors.push({
            text: 'Passwords must be at least 4 characters.'
        });
    }

    if (errors.length > 0) {
        res.render('session/signup', {
            errors,
            username,
            password
        })
    } else {
        // Look for UserName coincidence
        const valiUserName = await User.findAll({
            where: {
                username
            }
        });

        if (valiUserName.length > 0) {
            req.flash('error_msg', 'The Username is already in use.');
            res.redirect('/signup');
        } else {

            // Saving a New User
            await User.create({
                username,
                password,
                permission
            }, {
                fields: ['username', 'password', 'permission']
            }).then((result) => {
                req.flash('success_msg', 'You are registered');
                res.redirect('/signin');
            }).catch((err) => {
                console.log(err);
                req.flash('error_msg', 'Something went wrong creating user');
                res.render('session/signup', {
                    username,
                    password
                })
            });
        }
    }
};











export async function getStaff(req, res) {

    const {
        search
    } = req.body;

    const cedula = search

    await Rac.findOne({

        include: [{
                model: Staff,
                attributes: ['blood_type'],
                include: [{
                    model: Carnet,
                    attributes: ['cedula']
                }]
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

        where: {
            cedula
        },

        order: [
            ['id', 'ASC'],
        ],

        attributes: ['cedula', 'first_name', 'last_name']

    }).then((data) => {
        res.render('carnet/staff/view', {
            data
        });
    }).catch((err) => {
        console.log(err);
        req.flash('error_msg', 'could not get staff');
        res.render('staff/all-staff');
    });
}


export function renderFormCarnet(req, res) {
    res.render('carnet/carnet-staff')
};

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
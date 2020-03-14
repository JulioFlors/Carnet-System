import Department from '../../models/Departments'

export async function getDepartments(req, res) {

    console.log(Department.associations);

    await Department.findAll({
        order: [
            ['code_dep', 'ASC'],
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
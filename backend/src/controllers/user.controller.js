import User from '../models/Users';

export async function createUser(req, res) {
    const {
        username,
        password,
        permission
    } = req.body;

    await User.create({
        username,
        password,
        permission
    }, {
        fields: ['username', 'password', 'permission']
    }).then((result) => {
        res.json({
            message: 'User Create Successfuly',
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

export async function getUsers(req, res) {

    console.log(User.associations);

    await User.findAll({

        include: 'carnets',

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

export async function updateUser(req, res) {
    const {
        id
    } = req.params;

    const {
        username,
        password,
        permission
    } = req.body;

    await User.update({
        username,
        password,
        permission
    }, {
        where: {
            id
        }
    }).then((result) => {
        console.log(result);
        return res.json({
            message: 'User Updated Successfuly',
            data: {
                username,
                password,
                permission
            }
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    });
};

export async function deleteUser(req, res) {

    const {
        id
    } = req.params;

    await User.destroy({
        where: {
            id
        }
    }).then((result) => {
        console.log(result);
        res.json({
            message: 'User Deleted Successfuly'
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    });
}
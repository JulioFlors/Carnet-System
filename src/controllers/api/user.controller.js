import User from '../../models/Users';

export async function createUser(req, res) {
    const {
        username,
        password,
        permission
    } = req.body;

    // Convert username to Uppercase
    username = username.toUpperCase();

    await User.create({
        username,
        password,
        permission
    }, {
        fields: ['username', 'password', 'permission']
    }).then((result) => {
        req.flash('success_msg', 'User Created Successfuly');
        res.json({
            message: 'User Created Successfuly',
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

    // Convert username to Uppercase
    username.uppercase();

    await User.update({
        username,
        password,
        permission
    }, {
        where: {
            id
        }
    }).then((result) => {
        req.flash('success_msg', 'User Updated Successfuly');
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
        req.flash('success_msg', 'User Deleted Successfuly');
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
import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/database'
import Carnet from './Carnets'

import bcrypt from 'bcryptjs'

const User = sequelize.define('users', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },

    username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        notEmpty: true
    },

    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        notEmpty: true
    },

    permission: {
        type: Sequelize.STRING(5),
        allowNull: false,
        notEmpty: true,
        isIn: [
            ['Admin', 'Edit', 'Read']
        ]
    }
}, {
    hooks: {
        beforeCreate: async function (user) {
            let salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    },
    // instanceMethods: {
    //     matchPassword: async function (password) {
    //         return await bcrypt.compare(password, this.password);
    //     }
    // },
    timestamps: false
});

User.hasMany(Carnet, {
    foreignKey: 'id_user',
    sourceKey: 'id'
});

Carnet.belongsTo(User, {
    foreignKey: 'id_user',
    sourceKey: 'id'
});

// User.beforeCreate(async (user) => {
//     let salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
// })

// Adding an instance level methods.
User.prototype.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};

export default User;


// User.beforeCreate = async function (user) {
//     const salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(user.password, salt);
// };


// // Adding an instance Level Method
// // los métodos de instancia se definen en el modelo .prototype del modelo 
// User.prototype.encryptPassword = async function (user) {
//     let salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(user.password, salt);
// };
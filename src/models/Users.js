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
        type: Sequelize.STRING(20),
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


// Adding an instance Level Method
// los métodos de instancia se definen en el modelo .prototype del modelo 
User.prototype.encryptPassword = async function (password) {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

User.prototype.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password, );
};

export default User;
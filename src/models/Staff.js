import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/database'

import Carnet from './Carnets'
import Rac from './Rac'
import Photo from './Photos'

const Staff = sequelize.define('staff', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },

    cedula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },

    first_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        notEmpty: true,
        isAlpha: true
    },

    last_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        notEmpty: true,
        isAlpha: true
    },

    blood_type: {
        type: Sequelize.STRING(10),
        allowNull: false,
        notEmpty: true
    },

    code_dep: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

Staff.hasOne(Carnet, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

Carnet.hasOne(Staff, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

Staff.hasOne(Rac, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

Rac.hasOne(Staff, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

Staff.hasOne(Photo, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

Photo.hasOne(Staff, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

export default Staff;
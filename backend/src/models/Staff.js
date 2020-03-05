import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/databse'

import Carnet from './Carnets'
import Rac from './Rac'

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

Staff.HasOne(Carnet, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

Carnet.HasOne(Staff, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

Staff.HasOne(Rac, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

Rac.HasOne(Staff, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

export default Staff;
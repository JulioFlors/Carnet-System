import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/databse'

import Staff from './Staff'
import Rac from './Rac'

const Departments = sequelize.define('departments', {

    code_dep: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },

    description: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        notEmpty: true
    },

    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true, // will only allow numbers
        isInt: true, // checks for valid integers
    }
}, {
    timestamps: false
});

Departments.hasMany(Staff, {
    foreignKey: 'code_dep',
    sourceKey: 'code_dep'
});

Staff.belongsTo(Departments, {
    foreignKey: 'code_dep',
    sourceKey: 'code_dep'
});

Departments.hasMany(Rac, {
    foreignKey: 'code_dep',
    sourceKey: 'code_dep'
});

Rac.belongsTo(Departments, {
    foreignKey: 'code_dep',
    sourceKey: 'code_dep'
});

export default Departments;
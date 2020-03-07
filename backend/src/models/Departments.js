import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/databse'

import Staff from './Staff'
import Rac from './Rac'

const Department = sequelize.define('departments', {

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
        isNumeric: true,
        isInt: true
    }
}, {
    timestamps: false
});

Department.hasMany(Staff, {
    foreignKey: 'code_dep',
    sourceKey: 'code_dep'
});

Staff.belongsTo(Department, {
    foreignKey: 'code_dep',
    sourceKey: 'code_dep'
});

Department.hasMany(Rac, {
    foreignKey: 'code_dep',
    sourceKey: 'code_dep'
});

Rac.belongsTo(Department, {
    foreignKey: 'code_dep',
    sourceKey: 'code_dep'
});

export default Department;
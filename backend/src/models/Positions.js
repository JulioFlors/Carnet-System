import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/databse'

import Rac from './Rac'

const Positions = sequelize.define('positions', {

    code_pos: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        isNumeric: true, // will only allow numbers
        isInt: true, // checks for valid integers
    },

    description: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        notEmpty: true
    },

    grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true, // will only allow numbers
        isInt: true, // checks for valid integers
    }
}, {
    timestamps: false
});

Positions.hasMany(Rac, {
    foreignKey: 'code_pos',
    sourceKey: 'code_pos'
});

Rac.belongsTo(Positions, {
    foreignKey: 'code_pos',
    sourceKey: 'code_pos'
});

export default Positions;
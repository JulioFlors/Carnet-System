import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/databse'

import Rac from './Rac'

const Position = sequelize.define('positions', {

    code_pos: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        isNumeric: true,
        isInt: true
    },

    description: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        notEmpty: true
    }
}, {
    timestamps: false
});

Position.hasMany(Rac, {
    foreignKey: 'code_pos',
    sourceKey: 'code_pos'
});

Rac.belongsTo(Position, {
    foreignKey: 'code_pos',
    sourceKey: 'code_pos'
});

export default Position;
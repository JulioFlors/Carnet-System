import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/database'

const Rac = sequelize.define('rac', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },

    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,
        isInt: true
    },

    cedula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        isNumeric: true,
        isInt: true
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

    salary: {
        type: Sequelize.FLOAT(2),
        allowNull: false
    },

    code_pos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,
        isInt: true
    },

    code_dep: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,
        isInt: true
    }
}, {
    timestamps: false
});

export default Rac;
import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/database'

const Template = sequelize.define('templates', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        isNumeric: true,
        unique: true,
        isInt: true
    },

    title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        notEmpty: true,
        unique: true
    },

    description: {
        type: Sequelize.STRING(100),
        allowNull: false,
        notEmpty: true
    },

    orientation: {
        type: Sequelize.STRING(5),
        allowNull: false,
        notEmpty: true,
        isIn: [
            ['Front', 'Back']
        ]
    },

    filename: {
        type: Sequelize.STRING(100),
        allowNull: false,
        notEmpty: true
    },

    path: {
        type: Sequelize.STRING(100),
        allowNull: false,
        notEmpty: true
    },

    originalname: {
        type: Sequelize.STRING(100),
        allowNull: false,
        notEmpty: true
    },

    mimetype: {
        type: Sequelize.STRING(100),
        allowNull: false,
        notEmpty: true
    },

    size: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,
        isInt: true
    }
}, {
    timestamps: false
});

export default Template;
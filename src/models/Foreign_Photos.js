import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/database'

const Foreign_Photo = sequelize.define('foreign_photos', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        isNumeric: true,
        unique: true,
        isInt: true
    },

    cedula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        isNumeric: true,
        isInt: true
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

export default Foreign_Photo;
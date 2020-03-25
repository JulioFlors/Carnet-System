import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/database'

const Foreign_Carnet = sequelize.define('foreign_carnets', {

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

    date_of_issue: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },

    date_of_expiration: {
        type: Sequelize.STRING(20),
        allowNull: false
    },

    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,
        isInt: true
    }
}, {
    timestamps: false
});

export default Foreign_Carnet;
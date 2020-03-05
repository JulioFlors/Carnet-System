import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/databse'

const Carnet = sequelize.define('carnets', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        isNumeric: true, // will only allow numbers
        isInt: true, // checks for valid integers
    },

    cedula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        isNumeric: true, // will only allow numbers
        isInt: true, // checks for valid integers
    },

    date_of_issue: {
        type: Sequelize.DATE,
        allowNull: false,
        isAfter: "2020-01-01",
    },

    date_of_expiration: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        isAfter: "2020-11-01",
    },

    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true, // will only allow numbers
        isInt: true, // checks for valid integers
    }
}, {
    timestamps: false
});

export default Carnet;
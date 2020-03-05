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
        isNumeric: true,
        isInt: true,
    },

    cedula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        isNumeric: true,
        isInt: true,
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
        isNumeric: true,
        isInt: true,
    }
}, {
    timestamps: false
});

export default Carnet;
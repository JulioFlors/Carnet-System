import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/database'

const Carnet = sequelize.define('carnets', {

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

    createdAt: {
        field: 'date_of_issue',
        allowNull: false,
        type: Sequelize.DATE,
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
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    }

}, {
    timestamps: true
});

export default Carnet;
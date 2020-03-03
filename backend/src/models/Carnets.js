import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/databse'

const Carnet = sequelize.define('carnets', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },

    cedula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },

    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
});

export default Carnet;
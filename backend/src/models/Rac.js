import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/databse'

const Rac = sequelize.define('rac', {

    id_rac: {
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

    nombres: {
        type: Sequelize.STRING(50),
        allowNull: false,
        notEmpty: true
    },

    apellidos: {
        type: Sequelize.STRING(50),
        allowNull: false,
        notEmpty: true
    },

    sue_bas: {
        type: Sequelize.FLOAT(2),
        allowNull: false
    },

    cod_cargo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    cod_dep: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

export default Rac;
import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/database'

import Foreign_Carnet from './Foreign_Carnets'

const Foreign_Person = sequelize.define('foreign_persons', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
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

    blood_type: {
        type: Sequelize.STRING(10),
        allowNull: false,
        notEmpty: true
    },

    department: {
        type: Sequelize.STRING(255),
        allowNull: false,
        notEmpty: true
    },

    job_title: {
        type: Sequelize.STRING(255),
        allowNull: false,
        notEmpty: true
    }
}, {
    timestamps: false
});

Foreign_Person.hasOne(Foreign_Carnet, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

Foreign_Carnet.hasOne(Foreign_Person, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

export default Foreign_Person;
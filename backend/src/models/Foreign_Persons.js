import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/databse'

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
        unique: true
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

    code_dep: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

Foreign_Person.HasOne(Foreign_Carnet, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

Foreign_Carnet.HasOne(Foreign_Person, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

export default Foreign_Person;
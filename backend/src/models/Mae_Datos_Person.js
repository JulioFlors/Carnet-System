import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/databse'

import Carnet from './Carnets'
import Rac from './Rac'

const Mae_Datos_Person = sequelize.define('mae_datos_person', {

    id_person: {
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

    p_nombre: {
        type: Sequelize.STRING(15),
        allowNull: false, 
        notEmpty: true,
        isAlpha: true
    },

    s_nombre: {
        type: Sequelize.STRING(15),
        allowNull: false, 
        notEmpty: true,
        isAlpha: true
    },

    p_apellido: {
        type: Sequelize.STRING(15),
        allowNull: false, 
        notEmpty: true,
        isAlpha: true,
        isAlpha: true
    },

    s_apellido: {
        type: Sequelize.STRING(15),
        allowNull: false, 
        notEmpty: true,
        isAlpha: true
    },

    grupo_sang: {
        type: Sequelize.STRING(10),
        allowNull: false,
        notEmpty: true
    },

    cod_unidad: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

Mae_Datos_Person.HasOne(Carnet, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

Carnet.HasOne(Mae_Datos_Person, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

Mae_Datos_Person.HasOne(Rac, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

Rac.HasOne(Mae_Datos_Person, {
    foreignKey: 'cedula',
    sourceKey: 'cedula'
});

export default Mae_Datos_Person;
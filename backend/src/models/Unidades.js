import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/databse'

import Mae_Datos_Person from './Mae_Datos_Person'
import Rac from './Rac'

const Unidades = sequelize.define('unidades', { 

    cod_dep: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },

    des_uni: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        notEmpty: true
    }
}, {
    timestamps: false
});

Unidades.hasMany(Mae_Datos_Person, {
    foreignKey: 'cod_unidad',
    sourceKey: 'cod_dep'
});

Mae_Datos_Person.belongsTo(Unidades, {
    foreignKey: 'cod_unidad',
    sourceKey: 'cod_dep'
});

Unidades.hasMany(Rac, {
    foreignKey: 'cod_dep',
    sourceKey: 'cod_dep'
});

Rac.belongsTo(Unidades, {
    foreignKey: 'cod_dep',
    sourceKey: 'cod_dep'
});

export default Unidades;
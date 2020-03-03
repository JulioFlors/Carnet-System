import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/databse'

import Rac from './Rac'

const Ref_Cargos = sequelize.define('ref_cargos', {

    cod_cargo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },

    des_cargo: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        notEmpty: true
    },

    grado: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

Ref_Cargos.hasMany(Rac, {
    foreignKey: 'cod_cargo',
    sourceKey: 'cod_cargo'
});

Rac.belongsTo(Ref_Cargos, {
    foreignKey: 'cod_cargo',
    sourceKey: 'cod_cargo'
});

export default Ref_Cargos;
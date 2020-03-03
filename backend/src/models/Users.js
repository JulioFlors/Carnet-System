import Sequelize from 'Sequelize'
import {
    sequelize
} from '../database/databse'

import Carnet from './Carnets'

const User = sequelize.define('users', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },

    username: {
        type: Sequelize.STRING(20), 
        allowNull: false,
        unique: true
    },

    password: {
        type: Sequelize.STRING(255), 
        allowNull: false
    },

    permission: {
        type: Sequelize.STRING(5), 
        allowNull: false,
        isLowercase: true,
        isIn: [['admin', 'edit', 'read']],
    } 
}, {
    timestamps: true
});
 
User.hasMany(Carnet, { foreignKey: 'id_user', sourceKey: 'id' });

Carnet.belongsTo(User, { foreignKey: 'id_user', sourceKey: 'id' });

export default User;
// Environment Variables
require('dotenv').config();

import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        timezone: '-4:00',
        timestamps: false,
        pool: {
            max: 10,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
)
import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'CarnetDB',
    'postgres',
    'admin', {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        timezone: '-4:00',
        timestamps: false,
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
)
/* ------------------------------------------ */


// import Sequelize from 'sequelize';

// export const sequelize = new Sequelize(
//     'personal',
//     'supervisor',
//     'admin', {
//         host: 'localost',
//         dialect: 'postgres',
//         schema: 'admin_per',
//         pool: {
//             max: 20,
//             min: 0,
//             require: 30000,
//             idle: 10000
//         },
//         logging: false
//     }
// )

// // variables de configuracion de la base de datos
// $host = "128.1.12.11";
// $port = "5432";
// $dbuser = "supervisor";
// $dbpass = "alsobocaroni";
// $dbname = "personal";
// import Sequelize from 'sequelize';

// export const sequelize = new Sequelize(
//     'CarnetBD',
//     'postgres',
//     'password',
//     {
//         host: 'locallhost',
//         dialect: 'postgres',
//         pool: {
//             max: 20,
//             min: 0,
//             require: 30000,
//             idle: 10000
//         },
//         logging: false
//     }
// )
/* ------------------------------------------ */


// import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'personal',
    'supervisor',
    'admin', {
        host: 'locallhost',
        dialect: 'postgres',
        pool: {
            max: 20,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
)

// // variables de configuracion de la base de datos
// $host = "128.1.12.11";
// $port = "5432";
// $dbuser = "supervisor";
// $dbpass = "alsobocaroni";
// $dbname = "personal";
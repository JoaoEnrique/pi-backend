const dotenv = require('dotenv')
dotenv.config();

const dbConfig = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 5432,
    define: {
        timestamps: true,
        underscored: true, // Usar snake_case nos nomes de colunas e tabelas
    },
    dialectOptions: {
        ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false, // Ajuste se necessário
        } : false
    },
    logging: false, // Desativar logs SQL
}

// VERSÃO MYSQL
// const dbConfig = {
//     dialect: process.env.DB_DIALECT,
//     host: process.env.DB_HOST,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE, 
//     define: {
//         timestamps: true,
//         underscored: true, // Define que os nomes de colunas e tabelas serão em snake_case
//     },
// }

module.exports = dbConfig;
const dotenv = require('dotenv')
dotenv.config();

const dbConfig = {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE, 
    define: {
        timestamps: true,
        underscored: true, // Define que os nomes de colunas e tabelas serão em snake_case
    },
}

module.exports = dbConfig;
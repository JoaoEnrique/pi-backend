"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Determina o tipo de banco de dados a ser usado
const isPostgres = process.env.DB_DIALECT === 'postgres';
const dbConfig = isPostgres
    ? {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        define: {
            timestamps: true,
            underscored: true, // Define que os nomes de colunas e tabelas serão em snake_case
        },
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true, // Requer SSL
                rejectUnauthorized: false, // Define para false se o certificado não for confiável, mas cuidado com isso em produção
            },
        },
    }
    : {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        define: {
            timestamps: true,
            underscored: true, // Define que os nomes de colunas e tabelas serão em snake_case
        },
        dialect: 'mysql',
    };
module.exports = dbConfig;

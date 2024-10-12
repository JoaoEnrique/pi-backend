"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database")); // Altere o caminho se necessário
const connection = new sequelize_1.Sequelize(database_1.default.url || database_1.default); // Verifica se a URL está disponível
exports.default = connection;

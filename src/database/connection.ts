import { Sequelize } from 'sequelize';
import dbConfig from '../config/database'; // Altere o caminho se necessário

const connection = new Sequelize(dbConfig.url || dbConfig); // Verifica se a URL está disponível

export default connection;
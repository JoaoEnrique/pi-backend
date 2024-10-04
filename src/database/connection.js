import { Sequelize } from 'sequelize';
import dbConfig from '../config/database.js';

// Importação dos modelos
import User from '../models/User.js';
import Student from '../models/Student.js';

import Course from '../models/Course.js';
import Class from '../models/Class.js';

const connection = new Sequelize(dbConfig);

// Inicialização dos modelos
User.init(connection);
Student.init(connection);

Course.init(connection);
Class.init(connection);

// Associações
User.associate(connection.models);
Student.associate(connection.models);
Course.associate(connection.models);
Class.associate(connection.models);

export default connection;

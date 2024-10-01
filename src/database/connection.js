const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Course = require('../models/Course');
const Class = require('../models/Class');

const connection = new Sequelize(dbConfig);

User.init(connection);
Course.init(connection);
Class.init(connection);

Course.associate(connection.models);
User.associate(connection.models);
Class.associate(connection.models);

module.exports = connection;
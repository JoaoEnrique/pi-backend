"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Course_1 = __importDefault(require("./Course"));
class User extends sequelize_1.Model {
}
User.init({
    name: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING,
    password: sequelize_1.DataTypes.STRING,
    user_type: sequelize_1.DataTypes.STRING,
    code: sequelize_1.DataTypes.STRING,
    created_at: sequelize_1.DataTypes.INTEGER,
    updated_at: sequelize_1.DataTypes.INTEGER,
}, {
    sequelize: connection_1.default,
    tableName: 'users',
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }, // campos a serem excluídos
    },
});
User.hasOne(Course_1.default, { foreignKey: 'coordinator_id', as: 'courses' });
exports.default = User;

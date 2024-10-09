"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Course extends sequelize_1.Model {
}
Course.init({
    name: sequelize_1.DataTypes.STRING,
    period: sequelize_1.DataTypes.STRING,
    is_annual: sequelize_1.DataTypes.BOOLEAN,
    type_work: sequelize_1.DataTypes.STRING,
    created_at: sequelize_1.DataTypes.INTEGER,
    updated_at: sequelize_1.DataTypes.INTEGER,
}, {
    sequelize: connection_1.default,
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }, // campos a serem excluídos
    },
});
// Course.belongsTo(User, { foreignKey: 'coordinator_id', as: 'coordinator'})
exports.default = Course;

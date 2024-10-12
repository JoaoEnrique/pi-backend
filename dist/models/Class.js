"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const User_1 = __importDefault(require("./User"));
const Course_1 = __importDefault(require("./Course"));
class Class extends sequelize_1.Model {
}
Class.init({
    semester: sequelize_1.DataTypes.INTEGER,
    created_at: sequelize_1.DataTypes.INTEGER,
    updated_at: sequelize_1.DataTypes.INTEGER,
}, {
    sequelize: connection_1.default,
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }, // campos a serem excluídos
    },
});
Class.belongsTo(User_1.default, { foreignKey: 'teacher_id', as: 'teacher_tg' });
Class.belongsToMany(User_1.default, { through: 'student_posts', foreignKey: 'student_id', as: 'students' });
Class.belongsTo(Course_1.default, { foreignKey: 'course_id', as: 'course' });
exports.default = Class;

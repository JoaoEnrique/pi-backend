"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class StudentClass extends sequelize_1.Model {
    static initialize() {
        super.init({
            student_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'students', // Nome da tabela de estudantes
                    key: 'id',
                },
                onDelete: 'CASCADE', // Comportamento ao deletar um estudante
            },
            class_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'classes', // Nome da tabela de classes
                    key: 'id',
                },
                onDelete: 'CASCADE', // Comportamento ao deletar uma classe
            },
            created_at: sequelize_1.DataTypes.INTEGER,
            updated_at: sequelize_1.DataTypes.INTEGER,
        }, {
            sequelize: connection_1.default,
            modelName: 'StudentClass',
            tableName: 'student_classes', // Nome da tabela pivot
            timestamps: false, // Caso não precise de timestamps
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt'] }, // campos a serem excluídos
            },
        });
    }
}
StudentClass.initialize();
exports.default = StudentClass;

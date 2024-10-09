import { Model, DataTypes } from 'sequelize';
import connection from '../database/connection';
import User from './User';
import Course from './Course';

class Class extends Model {
    public semester!: number;
}

Class.init({
    semester: DataTypes.INTEGER,
    created_at: DataTypes.INTEGER,
    updated_at: DataTypes.INTEGER,
}, {
    sequelize: connection,
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }, // campos a serem excluídos
    },
})

Class.belongsTo(User, { foreignKey: 'teacher_id', as: 'teacher_tg'})
Class.belongsToMany(User, { through: 'student_posts', foreignKey: 'student_id', as: 'students'})
Class.belongsTo(Course, { foreignKey: 'course_id', as: 'course'})

export default Class;
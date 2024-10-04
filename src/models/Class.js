import { Model, DataTypes } from 'sequelize';

class Class extends Model {
    static init(connection){
        super.init({
            semester: DataTypes.INTEGER,
        }, {
            sequelize: connection
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'teacher_id', as: 'teacher_tg'})
        this.belongsToMany(models.User, { through: 'student_posts', foreignKey: 'student_id', as: 'students'})
        this.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course'})
    }
}

export default Class;
const { Model, DataTypes } = require('sequelize');

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
        this.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course'})
    }
}

module.exports = Class;
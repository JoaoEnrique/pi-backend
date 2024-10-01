const { Model, DataTypes } = require('sequelize');

class Course extends Model {
    static init(connection){
        super.init({
            name: DataTypes.STRING,
            period: DataTypes.STRING,
            is_annual: DataTypes.BOOLEAN,
            type_work: DataTypes.STRING
        }, {
            sequelize: connection
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'teacher_id', as: 'advisor'})
    }
}

module.exports = Course;
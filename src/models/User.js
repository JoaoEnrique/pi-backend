const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection){
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            user_type: DataTypes.JSON,
            code: DataTypes.STRING
        }, {
            sequelize: connection
        })
    }

    static associate(models){
        this.hasOne(models.Course, { foreignKey: 'teacher_id', as: 'courses'})
    }
}

module.exports = User;
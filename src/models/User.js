import { Model, DataTypes } from 'sequelize';

class User extends Model {
   static init(connection) {
       super.init({
           name: DataTypes.STRING,
           email: DataTypes.STRING,
           password: DataTypes.STRING,
           user_type: DataTypes.STRING,
           code: DataTypes.STRING,
       }, {
           sequelize: connection,
           tableName: 'users',
       },);
   }

   static associate(models) {
       this.hasOne(models.Course, { foreignKey: 'coordinator_id', as: 'courses' });
   }
}

export default User;

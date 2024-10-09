import { Model, DataTypes } from 'sequelize';
import connection from '../database/connection';
import Course from './Course';

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public user_type!: string;
    public code?: string;
    public created_at!: string;
    public updated_at!: string;
}

User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    user_type: DataTypes.STRING,
    code: DataTypes.STRING,
    created_at: DataTypes.INTEGER,
    updated_at: DataTypes.INTEGER,
}, {
    sequelize: connection,
    tableName: 'users',
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }, // campos a serem excluídos
    },
},);

User.hasOne(Course, { foreignKey: 'coordinator_id', as: 'courses' });

export default User;

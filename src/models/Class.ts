import { Model, DataTypes } from 'sequelize';
import connection from '../database/connection';
import User from './User';
import Course from './Course';

class Class extends Model {
    public semester!: number;

    public static initialize(){
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
    }
}

export default Class;
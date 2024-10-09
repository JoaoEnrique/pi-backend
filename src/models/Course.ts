import { Model, DataTypes }  from 'sequelize';
import connection from '../database/connection'

class Course extends Model {
    public id!: number;
    public name!: string;
    public period!: string;
    public is_annual!: Boolean;
    public type_work!: string;
}

Course.init({
    name: DataTypes.STRING,
    period: DataTypes.STRING,
    is_annual: DataTypes.BOOLEAN,
    type_work: DataTypes.STRING,
    created_at: DataTypes.INTEGER,
    updated_at: DataTypes.INTEGER,
}, {
    sequelize: connection,
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }, // campos a serem excluídos
    },
})

// Course.belongsTo(User, { foreignKey: 'coordinator_id', as: 'coordinator'})

export default Course;
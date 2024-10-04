import { Model, DataTypes } from 'sequelize';

class StudentClass extends Model {
    static init(connection){
        super.init({
            student_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'students', // Nome da tabela de estudantes
                    key: 'id',
                },
                onDelete: 'CASCADE', // Comportamento ao deletar um estudante
            },
            class_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'classes', // Nome da tabela de classes
                    key: 'id',
                },
                onDelete: 'CASCADE', // Comportamento ao deletar uma classe
            },
        }, {
            sequelize: connection,
            modelName: 'StudentClass',
            tableName: 'student_classes', // Nome da tabela pivot
            timestamps: false, // Caso não precise de timestamps
        })
    }
}

export default StudentClass;

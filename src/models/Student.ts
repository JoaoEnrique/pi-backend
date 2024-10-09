import User from './User';
import connection from '../database/connection'

class Student extends User {
    // static init(connection) {
    //     return super.init(connection);  // Chama o init da classe base (User)
    // }

    // static associate(models) {
    //     this.belongsToMany(models.Class, { through: 'student_classes', as: 'classes', foreignKey: 'class_id' });
    // }
}

// Student.init();

export default Student;

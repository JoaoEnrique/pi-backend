import User from './User';
import Class from './Course';
import StudentClass from './StudentClass';
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
Student.belongsToMany(Class, { through: StudentClass, as: 'classes', foreignKey: 'class_id' });

export default Student;

import User from './User';
import Class from './Course';
import StudentClass from './StudentClass';
import connection from '../database/connection'

class Student extends User {
    static initialize() {
        return super.initialize();  // Chama o init da classe base (User)
    }
}

export default Student;

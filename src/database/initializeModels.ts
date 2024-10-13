import User from '../models/User';
import Course from '../models/Course';
import Student from '../models/Student';
import StudentClass from '../models/StudentClass';
import Class from '../models/Class';

User.initialize();
Course.initialize();
StudentClass.initialize();
Class.initialize();

// Cursos
Course.belongsTo(User, { foreignKey: 'coordinator_id', as: 'coordinator'});

// Usuários
User.hasOne(Course, { foreignKey: 'coordinator_id', as: 'courses' });
User.hasOne(Class, { foreignKey: 'teacher_id', as: 'teacher' });

// Alunos
Student.belongsToMany(Class, { through: StudentClass, as: 'classes', foreignKey: 'class_id' });

// Turmas
Class.belongsTo(User, { foreignKey: 'teacher_id', as: 'teacher' });
Class.belongsToMany(User, { through: 'student_posts', foreignKey: 'student_id', as: 'students' });
Class.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });
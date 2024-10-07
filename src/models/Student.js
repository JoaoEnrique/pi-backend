const User = require('./User')

class Student extends User {
    static init(connection) {
        return super.init(connection);  // Chama o init da classe base (User)
    }

    static associate(models) {
        this.belongsToMany(models.Class, { through: 'student_classes', as: 'classes', foreignKey: 'class_id' });
    }
}

module.exports = Student;

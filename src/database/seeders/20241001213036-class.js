'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Classes', [
      {
        semester: '1º Semestre',
        teacher_id: 1, // ID do Professor A
        course_id: 1, // ID do Curso de Matemática
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        semester: '2º Semestre',
        teacher_id: 2, // ID do Professor B
        course_id: 2, // ID do Curso de Física
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Classes', null, {});
  }
};

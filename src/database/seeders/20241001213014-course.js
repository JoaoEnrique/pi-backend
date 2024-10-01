'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Courses', [
      {
        teacher_id: 1, // ID do Professor A
        name: 'Matemática',
        period: '2024',
        type_work: 'Teórico',
        is_annual: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        teacher_id: 2, // ID do Professor B
        name: 'Física',
        period: '2024',
        type_work: 'Prático',
        is_annual: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};

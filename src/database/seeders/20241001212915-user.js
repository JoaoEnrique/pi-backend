'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const saltRounds = 10;

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Professor A',
        email: 'professorA@example.com',
        password: await bcrypt.hash('123', saltRounds),
        user_type: 'professor',
        code: '123456',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Professor B',
        email: 'professorB@example.com',
        password: await bcrypt.hash('123', saltRounds),
        user_type: 'professor',
        code: '654321',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

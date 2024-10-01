'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('classes', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      semester: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      teacher_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: "CASCADE",
        onDelete: 'CASCADE',
        allowNull: false
      },

      course_id: {
        type: Sequelize.INTEGER,
        references: { model: 'courses', key: 'id' },
        onUpdate: "CASCADE",
        onDelete: 'CASCADE',
        allowNull: false
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('classes');
  }
};

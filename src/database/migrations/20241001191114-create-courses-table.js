'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('courses', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      teacher_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: "CASCADE",
        onDelete: 'CASCADE',
        allowNull: false
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      period: {
        type: Sequelize.STRING,
        allowNull: false
      },

      is_annual: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      type_work: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('courses');
  }
};

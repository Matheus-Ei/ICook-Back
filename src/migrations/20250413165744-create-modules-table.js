'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'modules',

      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        title: { type: Sequelize.STRING, unique: true },

        description: { type: Sequelize.STRING },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('modules');
  },
};

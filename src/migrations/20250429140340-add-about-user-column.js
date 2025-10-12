'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'about', {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: 'About you description...',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'about');
  },
};

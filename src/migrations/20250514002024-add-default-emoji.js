'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('pages', 'emoji', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '✨',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('pages', 'emoji', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
  }
};

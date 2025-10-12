'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('roles_permissions', 'role_permissions');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('role_permissions', 'roles_permissions');
  },
};

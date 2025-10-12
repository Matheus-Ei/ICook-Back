'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'roles_permissions',

      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        roleId: {
          type: Sequelize.INTEGER,
          field: 'role_id',
          references: {
            key: 'id',
            model: 'roles',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        permissionId: {
          type: Sequelize.INTEGER,
          field: 'permission_id',
          references: {
            key: 'id',
            model: 'permissions',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles_permissions');
  },
};

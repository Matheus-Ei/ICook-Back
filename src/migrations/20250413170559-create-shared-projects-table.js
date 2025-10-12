'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'shared_projects',

      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        roleId: {
          type: Sequelize.INTEGER,
          references: { model: 'roles', key: 'id' },
          field: 'role_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        userId: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          field: 'user_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        projectId: {
          type: Sequelize.INTEGER,
          references: { model: 'projects', key: 'id' },
          field: 'project_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },

        updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      }
    );

    await queryInterface.addConstraint('shared_projects', {
      fields: ['project_id', 'user_id'],
      type: 'unique',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shared_projects');
  },
};

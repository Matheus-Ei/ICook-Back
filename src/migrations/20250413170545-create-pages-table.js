'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'pages',

      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        title: { type: Sequelize.STRING, allowNull: false },

        description: { type: Sequelize.STRING },

        emoji: { type: Sequelize.STRING },

        parentId: {
          type: Sequelize.INTEGER,
          field: 'parent_id',
          references: { key: 'id', model: 'pages' },
          onDelete: 'CASCADE',
        },

        nextSiblingId: {
          type: Sequelize.INTEGER,
          field: 'next_sibling_id',
          references: { key: 'id', model: 'pages' },
          onDelete: 'SET NULL',
        },

        projectId: {
          type: Sequelize.INTEGER,
          field: 'project_id',
          references: { key: 'id', model: 'projects' },
          allowNull: false,
          onDelete: 'CASCADE',
        },

        moduleId: {
          type: Sequelize.INTEGER,
          field: 'module_id',
          references: { key: 'id', model: 'modules' },
          onDelete: 'CASCADE',
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

    await queryInterface.addConstraint('pages', {
      fields: ['project_id', 'parent_id', 'next_sibling_id'],
      type: 'unique',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pages');
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'recipe_images',

      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        recipeId: {
          type: Sequelize.INTEGER,
          field: 'recipe_id',
          allowNull: false,
          references: {
            model: 'recipes',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },

        imageBase64: {
          type: Sequelize.TEXT,
          field: 'image_base64',
          allowNull: false,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recipe_images');
  },
};

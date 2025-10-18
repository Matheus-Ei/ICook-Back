'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user_saved_recipes',
      [
        {
          user_id: 1,
          recipe_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          recipe_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          recipe_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 3,
          recipe_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          recipe_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          recipe_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          recipe_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_saved_recipes', null, {});
  },
};

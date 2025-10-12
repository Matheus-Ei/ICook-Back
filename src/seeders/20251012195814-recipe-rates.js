'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'recipe_rates',
      [
        {
          recipe_id: 1,
          user_id: 2,
          rate: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipe_id: 1,
          user_id: 3,
          rate: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipe_id: 1,
          user_id: 4,
          rate: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipe_id: 2,
          user_id: 1,
          rate: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipe_id: 2,
          user_id: 3,
          rate: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipe_id: 3,
          user_id: 1,
          rate: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipe_id: 4,
          user_id: 5,
          rate: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipe_id: 5,
          user_id: 2,
          rate: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recipe_rates', null, {});
  },
};

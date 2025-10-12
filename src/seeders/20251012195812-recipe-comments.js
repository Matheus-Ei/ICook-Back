'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'recipe_comments',
      [
        {
          recipe_id: 1,
          user_id: 2,
          comment: 'Fiz e ficou uma delícia! Recomendo.',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipe_id: 1,
          user_id: 3,
          comment: 'Receita maravilhosa, o bolo ficou super fofinho.',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipe_id: 2,
          user_id: 1,
          comment: 'Faltou um pouco de sal, mas a receita é boa.',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipe_id: 3,
          user_id: 4,
          comment: 'Perfeita para o almoço de família.',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipe_id: 5,
          user_id: 5,
          comment: 'Muito rápido e prático!',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recipe_comments', null, {});
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user_follows',
      [
        {
          follower_user_id: 1,
          followed_user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          follower_user_id: 1,
          followed_user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          follower_user_id: 2,
          followed_user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          follower_user_id: 3,
          followed_user_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          follower_user_id: 4,
          followed_user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          follower_user_id: 5,
          followed_user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_follows', null, {});
  },
};

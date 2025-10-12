'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM users`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getUserId = (email) => {
      const user = users.filter((u) => u.email === email);
      return user[0].id;
    };

    await queryInterface.bulkInsert('feedbacks', [
      {
        user_id: getUserId('matheus@gmail.com'),
        rating: 5,
        description: 'Very helpful app!',
      },
      {
        user_id: getUserId('matheus@gmail.com'),
        rating: 4,
        description: 'Easy to use and intuitive.',
      },

      {
        user_id: getUserId('lucas@gmail.com'),
        rating: 4,
        description: 'Good experience overall.',
      },
      {
        user_id: getUserId('lucas@gmail.com'),
        rating: 3,
        description: 'Could use more features.',
      },
      {
        user_id: getUserId('lucas@gmail.com'),
        rating: 5,
        description: 'Excellent support!',
      },

      {
        user_id: getUserId('jonas@gmail.com'),
        rating: 5,
        description: 'Super fast and reliable.',
      },
      {
        user_id: getUserId('jonas@gmail.com'),
        rating: 4,
        description: 'Nice interface.',
      },

      {
        user_id: getUserId('arthur@gmail.com'),
        rating: 4,
        description: 'Works as expected.',
      },
      {
        user_id: getUserId('arthur@gmail.com'),
        rating: 2,
        description: 'Found some bugs.',
      },
      {
        user_id: getUserId('arthur@gmail.com'),
        rating: 3,
        description: 'Needs improvement.',
      },
      {
        user_id: getUserId('arthur@gmail.com'),
        rating: 5,
        description: 'Loved it!',
      },

      {
        user_id: getUserId('dev@gmail.com'),
        rating: 5,
        description: 'Clean code and well structured.',
      },
      {
        user_id: getUserId('dev@gmail.com'),
        rating: 4,
        description: 'Documentation is clear.',
      },
      {
        user_id: getUserId('dev@gmail.com'),
        rating: 5,
        description: 'Perfect for developers!',
      },
      {
        user_id: getUserId('dev@gmail.com'),
        rating: 4,
        description: 'Good performance.',
      },
      {
        user_id: getUserId('dev@gmail.com'),
        rating: 3,
        description: 'Could improve response time.',
      },
      {
        user_id: getUserId('dev@gmail.com'),
        rating: 5,
        description: 'Secure and fast.',
      },
      {
        user_id: getUserId('dev@gmail.com'),
        rating: 4,
        description: 'Highly recommended.',
      },
      {
        user_id: getUserId('dev@gmail.com'),
        rating: 5,
        description: 'Great user experience.',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('feedbacks', null, {});
  },
};

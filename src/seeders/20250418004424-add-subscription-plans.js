'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('subscription_plans', [
      { title: 'free', duration: '1 year', price: 0.0 },
      { title: 'plus', duration: '1 month', price: 20.0 },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subscription_plans', null, {});
  },
};

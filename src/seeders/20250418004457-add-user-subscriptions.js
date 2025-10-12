'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM users`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const subscriptionPlans = await queryInterface.sequelize.query(
      `SELECT id, title FROM subscription_plans`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getSubscriptionPlanId = (title) => {
      const subs = subscriptionPlans.filter((s) => s.title === title);
      return subs[0].id;
    };

    const getUserId = (email) => {
      const user = users.filter((u) => u.email === email);
      return user[0].id;
    };

    await queryInterface.bulkInsert('user_subscriptions', [
      {
        subscription_plan_id: getSubscriptionPlanId('free'),
        user_id: getUserId('matheus@gmail.com'),
        status: 'active',
      },

      {
        subscription_plan_id: getSubscriptionPlanId('plus'),
        user_id: getUserId('lucas@gmail.com'),
        status: 'active',
      },

      {
        subscription_plan_id: getSubscriptionPlanId('plus'),
        user_id: getUserId('dev@gmail.com'),
        status: 'active',
      },

      {
        subscription_plan_id: getSubscriptionPlanId('free'),
        user_id: getUserId('jonas@gmail.com'),
        status: 'active',
      },

      {
        subscription_plan_id: getSubscriptionPlanId('plus'),
        user_id: getUserId('arthur@gmail.com'),
        status: 'active',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_subscriptions', null, {});
  },
};

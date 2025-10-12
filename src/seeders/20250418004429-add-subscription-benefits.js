'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const subscriptionPlans = await queryInterface.sequelize.query(
      `SELECT id, title FROM subscription_plans`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getSubscriptionId = (title) => {
      const permission = subscriptionPlans.filter((s) => s.title === title);
      return permission[0].id;
    };

    await queryInterface.bulkInsert('subscription_benefits', [
      {
        subscription_plan_id: getSubscriptionId('free'),
        title: 'Up to 10 Projects',
        description: 'Can create up to 10 projects',
      },

      {
        subscription_plan_id: getSubscriptionId('free'),
        title: '5 Shares for each project',
        description: 'Can share projects with up to 5 users',
      },

      {
        subscription_plan_id: getSubscriptionId('free'),
        title: 'Unlimited pages in each project',
        description: 'Each project can have unlimited pages',
      },

      {
        subscription_plan_id: getSubscriptionId('plus'),
        title: 'Full access of all modules',
        description: 'Have access to all modules in the system',
      },

      {
        subscription_plan_id: getSubscriptionId('plus'),
        title: 'Unlimited projects',
        description: 'Can create unlimited projects',
      },

      {
        subscription_plan_id: getSubscriptionId('plus'),
        title: 'Unlimited project shares',
        description: 'Can share each project with unlimited users',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subscription_benefits', null, {});
  },
};

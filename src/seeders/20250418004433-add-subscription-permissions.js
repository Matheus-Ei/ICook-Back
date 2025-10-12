'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const permissions = await queryInterface.sequelize.query(
      `SELECT id, title FROM permissions`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const subscriptionPlans = await queryInterface.sequelize.query(
      `SELECT id, title FROM subscription_plans`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getSubscriptionPlanId = (title) => {
      const subs = subscriptionPlans.filter((r) => r.title === title);
      return subs[0].id;
    };

    const getPermissionId = (title) => {
      const permission = permissions.filter((p) => p.title === title);
      return permission[0].id;
    };

    const subsPermissions = [
      {
        subscription_plan_id: getSubscriptionPlanId('free'),
        permissions: [].map((p) => getPermissionId(p)),
      },

      {
        subscription_plan_id: getSubscriptionPlanId('plus'),
        permissions: [
          'createUnlimitedProjects',
          'createUnlimitedPages',
          'createUnlimitedProjectShares',
          'useAllModules',
        ].map((p) => getPermissionId(p)),
      },
    ];

    const subsPermissionEntries = subsPermissions.flatMap((subsData) => {
      return subsData.permissions.map((permissionId) => ({
        subscription_plan_id: subsData.subscription_plan_id,
        permission_id: permissionId,
      }));
    });

    await queryInterface.bulkInsert(
      'subscription_permissions',
      subsPermissionEntries,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subscription_permissions', null, {});
  },
};

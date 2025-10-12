'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'permissions',

      [
        // Roles
        // Statistics
        { title: 'viewStats' },

        // Pages
        { title: 'viewPages' },
        { title: 'fillPages' },
        { title: 'editPages' },
        { title: 'deletePages' },
        { title: 'createPages' },

        // Shares
        { title: 'shareProject' },
        { title: 'unshareProject' },
        { title: 'viewProjectShares' },
        { title: 'changeProjectShareRoles' },

        // Project
        { title: 'viewProject' },
        { title: 'deleteProject' },
        { title: 'editProject' },

        // Subscriptions
        { title: 'createUnlimitedProjects' },
        { title: 'createUnlimitedPages' },
        { title: 'createUnlimitedProjectShares' },
        { title: 'useAllModules' },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {});
  },
};

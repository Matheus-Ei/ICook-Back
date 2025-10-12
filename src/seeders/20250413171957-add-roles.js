'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'roles',

      [
        { title: 'admin', description: 'Can do anything in the project' },

        /*         {
          title: 'manager',
          description: 'Can do anything except edit the project itself',
        },
 */
        {
          title: 'viewer',
          description: 'View the informations in the project',
        },

        {
          title: 'analizer',
          description: 'View the informations and the analizes in the project',
        },

        {
          title: 'editor',
          description: 'Edit everything except the project itself',
        },

        {
          title: 'filler',
          description:
            'Fill forms and informations in the project, without editing',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  },
};

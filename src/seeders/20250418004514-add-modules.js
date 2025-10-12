'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('modules', [
      { title: 'notes', description: 'Module that allows you to take notes' },
      { title: 'calendar', description: 'Integrate and complete calendar' },
      { title: 'board', description: 'Kanban board to manage tasks' },
      { title: 'graphic', description: 'Show and analize graphics' },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('modules', null, {});
  },
};

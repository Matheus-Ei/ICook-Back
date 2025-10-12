'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Matheus',
        email: 'matheus@gmail.com',
        password:
          '$2b$10$e486tfA3Cr3RLLUQvLjfG.qv4AaH5MxhVvRZSBtr9cl1xbCp06O9O',
      },
      {
        name: 'Lucas',
        email: 'lucas@gmail.com',
        password:
          '$2b$10$e486tfA3Cr3RLLUQvLjfG.qv4AaH5MxhVvRZSBtr9cl1xbCp06O9O',
      },
      {
        name: 'Jonas',
        email: 'jonas@gmail.com',
        password:
          '$2b$10$e486tfA3Cr3RLLUQvLjfG.qv4AaH5MxhVvRZSBtr9cl1xbCp06O9O',
      },
      {
        name: 'Arthur',
        email: 'arthur@gmail.com',
        password:
          '$2b$10$e486tfA3Cr3RLLUQvLjfG.qv4AaH5MxhVvRZSBtr9cl1xbCp06O9O',
      },
      {
        name: 'Developer',
        email: 'dev@gmail.com',
        password:
          '$2b$10$e486tfA3Cr3RLLUQvLjfG.qv4AaH5MxhVvRZSBtr9cl1xbCp06O9O',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};

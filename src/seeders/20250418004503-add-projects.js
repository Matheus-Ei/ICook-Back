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

    await queryInterface.bulkInsert('projects', [
      {
        title: 'Programming project',
        description: 'A project to develop a new ORM system to use with nodeJS',
        owner_user_id: getUserId('dev@gmail.com'),
      },

      {
        title: 'Abex IV',
        description:
          'To take some notes and save info about the discipline of Abex IV',
        owner_user_id: getUserId('jonas@gmail.com'),
      },

      {
        title: 'Biology studies',
        description:
          'Project to study about whales and their reproductive system',
        owner_user_id: getUserId('lucas@gmail.com'),
      },

      {
        title: 'Machine Learning Experiments',
        description:
          'Testing some models for classification and regression problems.',
        owner_user_id: getUserId('matheus@gmail.com'),
      },

      {
        title: 'Dev Blog',
        description:
          'Writing technical articles and tutorials about backend development.',
        owner_user_id: getUserId('dev@gmail.com'),
      },

      {
        title: 'Digital Art Portfolio',
        description:
          'Organizing personal artworks and designs for freelance clients.',
        owner_user_id: getUserId('arthur@gmail.com'),
      },

      {
        title: 'AI Notes',
        description:
          'Notes and summaries about recent studies in artificial intelligence.',
        owner_user_id: getUserId('matheus@gmail.com'),
      },

      {
        title: 'Marine Life',
        description:
          'Research and study material focused on marine ecosystems and animal life.',
        owner_user_id: getUserId('lucas@gmail.com'),
      },

      {
        title: 'ABEX IV - Complementary Study',
        description:
          'Additional notes, articles, and summaries related to ABEX IV discipline.',
        owner_user_id: getUserId('jonas@gmail.com'),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
  },
};

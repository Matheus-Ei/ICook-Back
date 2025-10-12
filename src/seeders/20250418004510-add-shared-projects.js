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

    const roles = await queryInterface.sequelize.query(
      `SELECT id, title FROM roles`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getRoleId = (title) => {
      const role = roles.filter((r) => r.title === title);
      return role[0].id;
    };

    await queryInterface.bulkInsert('shared_projects', [
      // Programming project (id: 1, owner: dev)
      {
        role_id: getRoleId('admin'),
        user_id: getUserId('jonas@gmail.com'),
        project_id: 1,
      },
      {
        role_id: getRoleId('viewer'),
        user_id: getUserId('lucas@gmail.com'),
        project_id: 1,
      },
      {
        role_id: getRoleId('analizer'),
        user_id: getUserId('matheus@gmail.com'),
        project_id: 1,
      },
      {
        role_id: getRoleId('editor'),
        user_id: getUserId('arthur@gmail.com'),
        project_id: 1,
      },

      // Abex IV (id: 2, owner: jonas)
      {
        role_id: getRoleId('viewer'),
        user_id: getUserId('lucas@gmail.com'),
        project_id: 2,
      },
      {
        role_id: getRoleId('editor'),
        user_id: getUserId('matheus@gmail.com'),
        project_id: 2,
      },
      {
        role_id: getRoleId('admin'),
        user_id: getUserId('dev@gmail.com'),
        project_id: 2,
      },

      // Biology studies (id: 3, owner: lucas)
      {
        role_id: getRoleId('analizer'),
        user_id: getUserId('jonas@gmail.com'),
        project_id: 3,
      },
      {
        role_id: getRoleId('viewer'),
        user_id: getUserId('arthur@gmail.com'),
        project_id: 3,
      },
      {
        role_id: getRoleId('filler'),
        user_id: getUserId('matheus@gmail.com'),
        project_id: 3,
      },

      // Machine Learning Experiments (id: 4, owner: matheus)
      {
        role_id: getRoleId('admin'),
        user_id: getUserId('dev@gmail.com'),
        project_id: 4,
      },
      {
        role_id: getRoleId('viewer'),
        user_id: getUserId('lucas@gmail.com'),
        project_id: 4,
      },
      {
        role_id: getRoleId('filler'),
        user_id: getUserId('jonas@gmail.com'),
        project_id: 4,
      },

      // Dev Blog (id: 5, owner: dev)
      {
        role_id: getRoleId('editor'),
        user_id: getUserId('arthur@gmail.com'),
        project_id: 5,
      },
      {
        role_id: getRoleId('viewer'),
        user_id: getUserId('matheus@gmail.com'),
        project_id: 5,
      },

      // Digital Art Portfolio (id: 6, owner: arthur)
      {
        role_id: getRoleId('analizer'),
        user_id: getUserId('lucas@gmail.com'),
        project_id: 6,
      },
      {
        role_id: getRoleId('admin'),
        user_id: getUserId('matheus@gmail.com'),
        project_id: 6,
      },

      // AI Notes (id: 7, owner: matheus)
      {
        role_id: getRoleId('filler'),
        user_id: getUserId('arthur@gmail.com'),
        project_id: 7,
      },
      {
        role_id: getRoleId('admin'),
        user_id: getUserId('dev@gmail.com'),
        project_id: 7,
      },

      // Marine Life (id: 8, owner: lucas)
      {
        role_id: getRoleId('admin'),
        user_id: getUserId('jonas@gmail.com'),
        project_id: 8,
      },
      {
        role_id: getRoleId('editor'),
        user_id: getUserId('matheus@gmail.com'),
        project_id: 8,
      },

      // ABEX IV - Complementary Study (id: 9, owner: jonas)
      {
        role_id: getRoleId('viewer'),
        user_id: getUserId('lucas@gmail.com'),
        project_id: 9,
      },
      {
        role_id: getRoleId('analizer'),
        user_id: getUserId('arthur@gmail.com'),
        project_id: 9,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('shared_projects', null, {});
  },
};

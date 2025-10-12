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
        about:
          'I am a passionate software developer with a strong background in building scalable, high-performance applications. With a continuous drive for learning, I enjoy working with modern technologies and solving complex problems through clean and efficient code. Over the years, I have collaborated on a variety of projects, from startups to enterprise-level solutions, always focusing on delivering value to users. I believe in the power of teamwork, open communication, and continuous improvement. When I’m not coding, I’m exploring new tech trends, contributing to open-source projects, or refining my skills to become a better developer every day.',
        password:
          '$2b$10$e486tfA3Cr3RLLUQvLjfG.qv4AaH5MxhVvRZSBtr9cl1xbCp06O9O',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};

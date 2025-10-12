'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Projects
    const projectsConstraintName = 'projects_owner_user_id_fkey';
    await queryInterface.removeConstraint('projects', projectsConstraintName);

    await queryInterface.addConstraint('projects', {
      fields: ['owner_user_id'],
      type: 'foreign key',
      name: projectsConstraintName,
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Feedbacks
    const feedbacksConstraintName = 'feedbacks_user_id_fkey';
    await queryInterface.removeConstraint('feedbacks', feedbacksConstraintName);

    await queryInterface.addConstraint('feedbacks', {
      fields: ['user_id'],
      type: 'foreign key',
      name: feedbacksConstraintName,
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Projects
    const projectsConstraintName = 'projects_owner_user_id_fkey';
    await queryInterface.removeConstraint('projects', projectsConstraintName);

    await queryInterface.addConstraint('projects', {
      fields: ['owner_user_id'],
      type: 'foreign key',
      name: projectsConstraintName,
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });

    // Feedbacks
    const feedbacksConstraintName = 'feedbacks_user_id_fkey';
    await queryInterface.removeConstraint('feedbacks', feedbacksConstraintName);

    await queryInterface.addConstraint('feedbacks', {
      fields: ['user_id'],
      type: 'foreign key',
      name: feedbacksConstraintName,
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  },
};

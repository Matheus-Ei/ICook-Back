'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subscription_benefits', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      title: { type: Sequelize.STRING, unique: true },

      description: { type: Sequelize.TEXT },

      subscriptionPlanId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'subscription_plan_id',
        references: {
          key: 'id',
          model: 'subscription_plans',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('subscription_benefits');
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subscription_permissions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

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

      permissionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'permission_id',
        references: {
          key: 'id',
          model: 'permissions',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('subscription_permissions');
  },
};

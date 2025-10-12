import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';
import { UsersModel } from './UsersModel';
import { SubscriptionPlansModel } from './SubscriptionPlansModel';

export class UserSubscriptionsModel extends AbstractModel<UserSubscriptionsModel> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare subscriptionPlanId: number;
  declare status: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;

  static setup = (sequelize: Sequelize) => {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        userId: {
          type: DataTypes.INTEGER,
          references: { model: UsersModel, key: 'id' },
          allowNull: false,
          field: 'user_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        subscriptionPlanId: {
          type: DataTypes.INTEGER,
          references: { model: SubscriptionPlansModel, key: 'id' },
          allowNull: false,
          field: 'subscription_plan_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        createdAt: {
          type: DataTypes.DATE,
          field: 'created_at',
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },

        updatedAt: {
          type: DataTypes.DATE,
          field: 'updated_at',
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },

        status: { type: DataTypes.STRING, allowNull: false },
      },

      {
        sequelize,
        tableName: 'user_subscriptions',
        underscored: true,
        timestamps: true,
      }
    );
  };
}

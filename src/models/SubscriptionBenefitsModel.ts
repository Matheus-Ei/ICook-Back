import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';
import { SubscriptionPlansModel } from './SubscriptionPlansModel';

export class SubscriptionBenefitsModel extends AbstractModel<SubscriptionBenefitsModel> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare subscriptionPlanId: number;

  static setup = (sequelize: Sequelize) => {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        title: { type: DataTypes.STRING, unique: true },

        description: { type: DataTypes.TEXT },

        subscriptionPlanId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'subscription_plan_id',
          references: {
            key: 'id',
            model: SubscriptionPlansModel,
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },

      {
        sequelize,
        tableName: 'subscription_benefits',
        underscored: true,
        timestamps: false,
      }
    );
  };
}

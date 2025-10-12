import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';
import { SubscriptionPlansModel } from './SubscriptionPlansModel';
import { PermissionsModel } from './PermissionsModel';

export class SubscriptionPermissionsModel extends AbstractModel<SubscriptionPermissionsModel> {
  declare id: CreationOptional<number>;
  declare subscriptionPlanId: number;
  declare permissionId: number;

  static setup = (sequelize: Sequelize) => {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

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

        permissionId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'permission_id',
          references: {
            key: 'id',
            model: PermissionsModel,
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },

      {
        sequelize,
        tableName: 'subscription_permissions',
        underscored: true,
        timestamps: false,
      }
    );
  };
}
